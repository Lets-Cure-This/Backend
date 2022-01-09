import { Injectable } from '@nestjs/common';

@Injectable()
export class DiseasesService {
  hydrateDB() {
    return 'This action adds a new disease';
  }

  findAll() {
    return `This action returns all diseases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} disease`;
  }
}
