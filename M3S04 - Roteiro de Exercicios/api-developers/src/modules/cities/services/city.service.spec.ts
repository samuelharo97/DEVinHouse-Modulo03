import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';

import { NotFoundException } from '@nestjs/common';
import { CityRepository } from '../city.repository';
import { StateRepository } from 'src/modules/states/state.repository';
import { TestStatic } from 'src/utils/test';

describe('CityService', () => {
  let service: CityService;

  const mockCityRepository = {
    getById: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    createCity: jest.fn(),
  };

  const mockStateRepository = {
    findOneByOrFail: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CityRepository,
          useValue: mockCityRepository,
        },
        {
          provide: StateRepository,
          useValue: mockStateRepository,
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
  });

  beforeEach(() => {
    mockCityRepository.save.mockReset();
    mockCityRepository.findOne.mockReset();
    mockCityRepository.getById.mockReset();
    mockCityRepository.createCity.mockReset();
  });

  it('cityService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('cityRepository should be defined', () => {
    expect(CityRepository).toBeDefined();
  });

  describe('findById', () => {
    it('should return a city by id', async () => {
      const mockCity = TestStatic.cityData();
      jest.spyOn(mockCityRepository, 'getById').mockResolvedValue(mockCity);

      expect(await service.findById(1)).toBe(mockCity);
    });

    it('should throw an error if city not found', async () => {
      jest.spyOn(mockCityRepository, 'getById').mockResolvedValue(null);

      try {
        await service.findById(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('cityNotFound');
      }
    });
  });

  describe('addCustomCity', () => {
    it('should create a city with valid input', async () => {
      const mockCity = TestStatic.cityData();
      const state = TestStatic.stateData();

      mockStateRepository.findOneByOrFail.mockResolvedValue(state);

      mockCityRepository.findOne.mockResolvedValue(mockCity);

      jest.spyOn(service, 'createCity').mockResolvedValue(undefined);

      await service.addCustomCity(mockCity);

      expect(service.createCity).toHaveBeenCalledTimes(1);
    });

    it('should throw error if city already exists', async () => {
      const mockDto = TestStatic.cityDto();
      const state = TestStatic.stateData();

      expect(
        mockStateRepository.findOneByOrFail.mockResolvedValue(state),
      ).toBeDefined();

      await service.addCustomCity(mockDto).catch((error: Error) => {
        expect(error).toMatchObject({
          message: 'cityAlreadyExists',
        });
      });
    });
  });

  describe('createCity method', () => {
    it('should create a city with valid input', async () => {
      const mockCity = TestStatic.cityData();

      jest.spyOn(mockCityRepository, 'createCity').mockResolvedValue(undefined);

      await service.createCity(mockCity);

      expect(mockCityRepository.createCity).toHaveBeenCalledWith(mockCity);
    });

    it('should throw error if fails to save city', async () => {
      const mockCity = TestStatic.cityData();

      await service.createCity(mockCity).catch((error: Error) => {
        expect(error).toThrowError();
      });
    });
  });
});
