import { inject } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import { AppError } from "@shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";

interface IRequest{
    id:string;
    user_id:string;
}


class DevolutionRentalUseCase{

    constructor(
        @inject("rentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ){}


    async execute({id, user_id}: IRequest): Promise<Rental>{

        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(id)
        const minimum_daily = 1;

        if(!rental){
            throw new AppError("Rental does not exists")
        }

        //Verificar o tempo de aluguel

        const dateNow = this.dateProvider.dateNow();

        //Verificação da diária

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        )

        if(daily <= 0 ){
            daily = 1;
        }


        //calcula a quantidade de atrasos
        const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date)
        let total = 0
        
        if(delay > 0 ){
            const calculate_fine = delay * car.fine_amount
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;
    
        await this.rentalsRepository.create(rental);
    
        await this.carsRepository.updateAvailable(car.id, true);
    
        return rental;
    }
}

export {DevolutionRentalUseCase}