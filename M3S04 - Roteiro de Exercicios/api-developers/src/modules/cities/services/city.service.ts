import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCityDto } from '../dto/create-city.dto';
import { CityRepository } from '../city.repository';
import { CityEntity } from '../entities/city.entity';

@Injectable()
export class CityService {
  constructor(private readonly cityRepository: CityRepository) {}

  async findById(id: number): Promise<CityEntity> {
    const foundCity = await this.cityRepository.getById(id);
    if (!foundCity) {
      throw new NotFoundException('cityNotFound');
    }

    return foundCity;
  }

  async addCustomCity(city: CreateCityDto): Promise<void> {
    await this.cityRepository.findOneOrFail({
      where: { state_id: city.state_id },
    });

    const cityAlreadyExists = await this.cityRepository.findOne({
      where: { name: city.name },
    });

    if (cityAlreadyExists) {
      throw new ConflictException('cityAlreadyExists');
    }

    await this.createCity(city);
  }

  async createCity(newCity: CreateCityDto): Promise<void> {
    await this.cityRepository.createCity(newCity);
  }

  async deleteCity(id: number): Promise<void> {
    const foundCity = await this.cityRepository.getById(id);
    if (!foundCity) {
      throw new NotFoundException('cityNotFound');
    }
    await this.cityRepository.delete(foundCity);
  }
}
