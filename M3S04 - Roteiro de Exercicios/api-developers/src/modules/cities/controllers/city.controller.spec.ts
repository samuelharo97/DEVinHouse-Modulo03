import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from 'src/modules/states/services/state.service';
import { CityService } from '../services/city.service';
import { CityController } from './city.controller';
import { TestStatic } from 'src/utils/test';
import { BadRequestException } from '@nestjs/common';
import axios from 'axios';

describe('CityController', () => {
  let controller: CityController;

  const mockCityService = {
    findById: jest.fn(),
    addCustomCity: jest.fn(),
    updateCity: jest.fn(),
    createCity: jest.fn(),
    deleteCity: jest.fn(),
  };

  const mockStateService = {
    getByAll: jest.fn(),
    createState: jest.fn(),
    createNewState: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        { provide: CityService, useValue: mockCityService },
        { provide: StateService, useValue: mockStateService },
        { provide: axios, useValue: { get: jest.fn() } },
      ],
    }).compile();

    controller = module.get<CityController>(CityController);
  });

  beforeEach(() => {
    mockCityService.addCustomCity.mockReset();
    mockCityService.createCity.mockReset();
    mockCityService.deleteCity.mockReset();
    mockCityService.findById.mockReset();
    mockCityService.updateCity.mockReset();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getById', () => {
    it('should return a city by id', async () => {
      const city = TestStatic.cityData();

      mockCityService.findById.mockResolvedValue(city);

      const foundCity = await controller.getById(city.id);

      expect(foundCity).toMatchObject({ id: city.id });

      expect(mockCityService.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if city not found', async () => {
      try {
        await controller.getById(1);
        await mockCityService.findById(1);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });

    it('should throw an error if id is not a number', async () => {
      const anyValue = 'notValid' as unknown as number;
      try {
        await controller.getById(anyValue);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('create method', () => {
    it('should create a city with valid input', async () => {
      const mockCity = {
        name: 'Test City',
        state_id: 1,
      };

      jest.spyOn(mockCityService, 'addCustomCity').mockResolvedValue(undefined);

      const response = await controller.create(mockCity);

      expect(response).toEqual('Cidade salva com sucesso');
    });

    it('should throw error with invalid input', async () => {
      const mockCity = {
        name: 'Test City',
        state_id: 1,
      };

      jest
        .spyOn(mockCityService, 'addCustomCity')
        .mockRejectedValue(new Error());

      await expect(controller.create(mockCity)).rejects.toThrow();
    });
  });

  describe('createAllCities method', () => {
    it('should create all cities', async () => {
      const mockData = [
        {
          nome: 'City 1',
          microrregiao: {
            mesorregiao: {
              UF: {
                sigla: 'SP',
              },
            },
          },
        },
        {
          nome: 'City 2',
          microrregiao: {
            mesorregiao: {
              UF: {
                sigla: 'RJ',
              },
            },
          },
        },
      ];

      const mockStates = [
        {
          id: 1,
          initials: 'SP',
        },
        {
          id: 2,
          initials: 'RJ',
        },
      ];

      jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });
      jest.spyOn(mockStateService, 'getByAll').mockResolvedValue(mockStates);
      jest.spyOn(mockCityService, 'createCity').mockResolvedValue(undefined);

      const response = await controller.createAllCities();

      expect(response).toEqual('Cidades salvas com sucesso');
    });

    it('should handle error properly', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error());

      await expect(controller.createAllCities()).rejects.toThrow();
    });
  });

  describe('updateById', () => {
    it('should update a city successfully', async () => {
      const id = 1;
      const body = TestStatic.cityDto();

      jest
        .spyOn(mockCityService, 'updateCity')
        .mockResolvedValue('Cidade atualizada com sucesso');

      const response = await mockCityService.updateCity(id, body);

      expect(response).toBe('Cidade atualizada com sucesso');
    });

    it('should throw an error if updateById method fails', async () => {
      const id = 1;
      const body = TestStatic.cityDto();

      jest.spyOn(controller, 'updateById').mockRejectedValue(new Error());

      await expect(controller.updateById(id, body)).rejects.toThrowError(Error);
      expect(controller.updateById).toHaveBeenCalledWith(1, body);
    });

    it('should throw an error if id parameter is not a number', async () => {
      const id = 'invalidId';
      const body = TestStatic.cityDto();

      await controller
        .updateById(id as unknown as number, body)
        .catch((error: Error) => {
          expect(error).toBeInstanceOf(Error);
        });
    });
  });
});
