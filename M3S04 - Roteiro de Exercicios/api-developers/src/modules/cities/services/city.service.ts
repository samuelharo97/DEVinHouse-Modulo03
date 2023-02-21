import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCityDto } from '../dto/create-city.dto';
import { CityRepository } from '../city.repository';
import { CityEntity } from '../entities/city.entity';
import { StateRepository } from 'src/modules/states/state.repository';

@Injectable()
export class CityService {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly stateRepository: StateRepository,
  ) {}

  async findById(id: number): Promise<CityEntity> {
    const foundCity = await this.cityRepository.getById(id);
    if (!foundCity) {
      throw new NotFoundException('cityNotFound');
    }

    return foundCity;
  }

  async addCustomCity(city: CreateCityDto): Promise<void> {
    await this.stateRepository.findOneByOrFail({ id: city.state_id });

    const cityAlreadyExists = await this.stateRepository.findOne({
      where: { name: city.name },
    });

    if (cityAlreadyExists) {
      throw new ConflictException('cityAlreadyExists');
    }

    await this.createCity(city);
  }

  async updateCity(id: number, body: CreateCityDto): Promise<string> {
    const city = await this.findById(id);

    city.name = body.name;
    city.state_id = body.state_id;

    await this.cityRepository.save(city);

    return 'Cidade atualizada com sucesso';
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
