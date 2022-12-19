import { Controller, Post } from '@nestjs/common';

@Controller()
export class AnnoncesController {
    @Post()
    addAnnonce(): string {
        return '';
    }
}
