import { Controller, Post, Get, Param, Delete, UsePipes } from '@nestjs/common';
import { StateService } from '../../states/services/state.service';
import { CityService } from '../services/city.service';
import axios from 'axios';
import { City } from '../interfaces';
import { ApiTags } from '@nestjs/swagger';
import { CityEntity } from '../entities/city.entity';
import { NumberValidationPipe } from 'src/core/constraints/number-validation.pipe';

@ApiTags('cities')
@Controller('city')
export class CityController {
  constructor(
    private cityService: CityService,
    private stateService: StateService,
  ) {}

  @Get(':id')
  @UsePipes(new NumberValidationPipe())
  async getById(@Param('id') id: number): Promise<CityEntity> {
    try {
      return await this.cityService.findById(id);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @UsePipes(new NumberValidationPipe())
  async DeleteQueryBuilder(@Param('id') id: number): Promise<object> {
    try {
      await this.cityService.deleteCity(id);
      return { acknowledged: true, deletedCount: 1 };
    } catch (error) {
      throw error;
    }
  }

  @Post('createAllCities')
  async createAllCities(): Promise<string> {
    try {
      const { data } = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/municipios',
      );
      const states = await this.stateService.getByAll();

      data.forEach((city: City) => {
        const state = states.find(
          ({ initials }) => city.microrregiao.mesorregiao.UF.sigla === initials,
        );

        const newCity = {
          name: city.nome,
          state_id: state.id,
        };

        this.cityService.createCity(newCity);
      });
      return 'Cidades salvas com sucesso';
    } catch (error) {
      console.log(error);
    }
  }
}
