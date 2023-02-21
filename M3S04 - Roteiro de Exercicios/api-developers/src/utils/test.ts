import { CreateCityDto, CreateCountryDto } from 'src/core/dtos';
import { CityEntity, CountryEntity, StateEntity } from 'src/core/entities';

export class TestStatic {
  static countryData(): CountryEntity {
    const country = new CountryEntity();
    country.id = 1;
    country.language = 'Português';
    country.name = 'Brasil';
    country.createdAt = new Date();
    country.updatedAt = new Date();
    country.deletedAt = null;

    return country;
  }

  static cityData(): CityEntity {
    const city = new CityEntity();
    city.id = 1;
    city.name = 'Curitiba';
    city.state_id = 2;
    city.state = new StateEntity();
    city.createdAt = new Date();
    city.updatedAt = new Date();
    city.deletedAt = null;

    return city;
  }

  static cityDto(): CreateCityDto {
    const createCityDto = new CreateCityDto();
    createCityDto.name = 'Curitiba';
    createCityDto.state_id = 2;

    return createCityDto;
  }

  static countryDto(): CreateCountryDto {
    const countryBodyDto = new CreateCountryDto();
    countryBodyDto.language = 'Português';
    countryBodyDto.name = 'Brasil';

    return countryBodyDto;
  }

  static stateData(): StateEntity {
    const state = new StateEntity();

    state.id = 1;
    state.country = new CountryEntity();
    state.country_id = 1;
    state.initials = 'SP';
    state.name = 'São Paulo';
    state.createdAt = new Date();
    state.updatedAt = new Date();
    state.deletedAt = null;

    return state;
  }

  static countriesData(): CountryEntity[] {
    const countries = ['Brasil', 'Canada', 'China'].map((name, index) => {
      const country = new CountryEntity();
      country.id = index + 1;
      country.language = 'Português';
      country.name = name;
      country.createdAt = new Date(`2023-02-1${index + 1} 12:06:12.090`);
      country.updatedAt = new Date(`2023-02-1${index + 1} 12:06:12.090`);
      country.deletedAt = null;

      return country;
    });

    return countries;
  }
}
