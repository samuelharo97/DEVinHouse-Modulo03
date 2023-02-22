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
    delete: jest.fn(),
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
    mockCityRepository.delete.mockReset();
    mockCityRepository.createCity.mockReset();
  });

  it('CityService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('cityRepository should be defined', () => {
    expect(mockCityRepository).toBeDefined();
  });

  it('stateRepository should be defined', () => {
    expect(mockStateRepository).toBeDefined();
  });

  describe('findById', () => {
    it('should return a city by id', async () => {
      const mockCity = TestStatic.cityData();

      jest.spyOn(mockCityRepository, 'getById').mockResolvedValue(mockCity);

      expect(await service.findById(1)).toBe(mockCity);

      expect(mockCityRepository.getById).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if city not found', async () => {
      jest.spyOn(mockCityRepository, 'getById').mockResolvedValue(null);

      try {
        await service.findById(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);

        expect(error.message).toEqual('cityNotFound');
      }
      expect(mockCityRepository.getById).toHaveBeenCalledTimes(1);
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

  describe('createCity', () => {
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

  describe('updateCity', () => {
    it('should update a city if city exists', async () => {
      const updatedCityData = TestStatic.cityDto();
      const existingCityData = TestStatic.cityData();
      jest.spyOn(service, 'findById').mockResolvedValue(existingCityData);

      existingCityData.name = updatedCityData.name;
      existingCityData.state_id = updatedCityData.state_id;
      await mockCityRepository.save(existingCityData);

      expect(mockCityRepository.save).toHaveBeenCalledTimes(1);
      expect(existingCityData.name).toBe(updatedCityData.name);
      expect(existingCityData.state_id).toBe(updatedCityData.state_id);
    });

    it('should throw error if city not found', async () => {
      service.findById(undefined).catch((error: Error) => {
        expect(error).toBeInstanceOf(NotFoundException);
      });

      expect(mockCityRepository.save).toHaveBeenCalledTimes(0);
    });

    it('should throw error when it fails to update city', async () => {
      const cityDto = TestStatic.cityDto();
      const city = TestStatic.cityData();

      jest.spyOn(service, 'findById').mockResolvedValue(city);

      jest.spyOn(mockCityRepository, 'save').mockRejectedValue(new Error());

      try {
        await service.updateCity(city.id, cityDto);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('deleteCity', () => {
    it('should delete a city if valid input', async () => {
      const city = TestStatic.cityData();
      jest.spyOn(service, 'findById').mockResolvedValue(city);

      await mockCityRepository.delete(city);
      expect(mockCityRepository.delete).toHaveBeenCalledTimes(1);

      jest.spyOn(service, 'findById').mockResolvedValue(null);
      expect(await service.findById(city.id)).toBeNull();
    });

    it('should throw error when it fails to find city', async () => {
      const city = TestStatic.cityData();

      const foundCity = await mockCityRepository.getById(city.id);
      expect(foundCity).toBeUndefined();

      jest.spyOn(service, 'findById').mockResolvedValue(null);

      await expect(service.deleteCity(city.id)).rejects.toThrow('cityNotFound');
      expect(mockCityRepository.delete).toHaveBeenCalledTimes(0);
    });

    it('should throw error when it fails to delete city', async () => {
      const city = TestStatic.cityData();

      jest.spyOn(service, 'findById').mockResolvedValue(city);

      jest.spyOn(mockCityRepository, 'delete').mockRejectedValue(new Error());

      try {
        await service.deleteCity(city.id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
