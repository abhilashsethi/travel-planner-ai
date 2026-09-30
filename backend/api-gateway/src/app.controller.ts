import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("health")
export class AppController {

  @Get()
  getHealth() {
    return {
      status: 'ok',
      service: 'api-gateway',
    };
  }
}
