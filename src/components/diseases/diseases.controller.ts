import { Controller, Get, Param} from '@nestjs/common';
import { DiseasesService } from './diseases.service';

@Controller('diseases')
export class DiseasesController {
  constructor(private readonly diseasesService: DiseasesService) {}

  @Get()
  findAll() {
    return this.diseasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diseasesService.findOne(+id);
  }
}
