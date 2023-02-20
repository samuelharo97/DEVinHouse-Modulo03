import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from 'src/modules/states/services/state.service';
import { CityEntity } from '../entities/city.entity';
import { CityService } from '../services/city.service';
import { CityController } from './city.controller';

describe('CityController', () => {
  let controller: CityController;
  let cityService: CityService;
  let stateService: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        {
          provide: CityService,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: StateService,
          useValue: `I'm not even using this yet`,
        },
      ],
    }).compile();

    controller = module.get<CityController>(CityController);
    cityService = module.get<CityService>(CityService);
    stateService = module.get<StateService>(StateService);
  });

  describe('getById', () => {
    it('should return a city by id', async () => {
      const city: CityEntity = {
        id: 1,
        name: 'Test City',
        state_id: 1,
      } as CityEntity;
      jest.spyOn(cityService, 'findById').mockResolvedValue(city);

      expect(await controller.getById(1)).toBe(city);
    });

    it('should throw an error if city not found', async () => {
      jest.spyOn(cityService, 'findById').mockResolvedValue(null);

      try {
        await controller.getById(1);
      } catch (error) {
        expect(error.message).toEqual('City not found');
      }
    });

    it('should throw an error if id is not a number', async () => {
      try {
        await controller.getById('test' as unknown as number);
      } catch (error) {
        expect(error.message).toEqual(
          'Validation failed (numeric string is expected)',
        );
      }
    });
  });
});
