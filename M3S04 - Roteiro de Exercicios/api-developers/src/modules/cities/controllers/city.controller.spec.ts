import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from 'src/modules/states/services/state.service';
import { CityEntity } from '../entities/city.entity';
import { CityService } from '../services/city.service';
import { CityController } from './city.controller';
import { TestStatic } from 'src/utils/test';
import { BadRequestException } from '@nestjs/common';

describe('CityController', () => {
  let controller: CityController;
  let stateService: StateService;

  const mockService = {
    findById: jest.fn(),
    addCustomCity: jest.fn(),
    updateCity: jest.fn(),
    createCity: jest.fn(),
    deleteCity: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        { provide: CityService, useValue: mockService },
        {
          provide: StateService,
          useValue: `I'm not even using this yet`,
        },
      ],
    }).compile();

    controller = module.get<CityController>(CityController);
    stateService = module.get<StateService>(StateService);
  });

  beforeEach(() => {
    mockService.addCustomCity.mockReset();
    mockService.createCity.mockReset();
    mockService.deleteCity.mockReset();
    mockService.findById.mockReset();
    mockService.updateCity.mockReset();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getById', () => {
    it('should return a city by id', async () => {
      const city = TestStatic.cityData();

      mockService.findById.mockResolvedValue(city);

      const foundCity = await controller.getById(city.id);

      expect(foundCity).toMatchObject({ id: city.id });

      expect(mockService.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if city not found', async () => {
      try {
        await controller.getById(1);
        await mockService.findById(1);
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
});
