import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';

import { NotFoundException } from '@nestjs/common';
import { CityRepository } from '../city.repository';
import { StateRepository } from 'src/modules/states/state.repository';
import { CityEntity } from '../entities/city.entity';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: CityRepository;
  let stateRepository: StateRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CityRepository,
          useValue: {
            getById: jest.fn(),
          },
        },
        {
          provide: StateRepository,
          useValue: `Still not using this`,
        },
      ],
    }).compile();
    service = module.get<CityService>(CityService);
    cityRepository = module.get<CityRepository>(CityRepository);
    stateRepository = module.get<StateRepository>(StateRepository);
  });

  describe('findById', () => {
    it('should return a city by id', async () => {
      const city: CityEntity = {
        id: 1,
        name: 'Test City',
        state_id: 1,
      } as CityEntity;
      jest.spyOn(cityRepository, 'getById').mockResolvedValue(city);

      expect(await service.findById(1)).toBe(city);
    });

    it('should throw an error if city not found', async () => {
      jest.spyOn(cityRepository, 'getById').mockResolvedValue(null);

      try {
        await service.findById(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('cityNotFound');
      }
    });
  });
});
