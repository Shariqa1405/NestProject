import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Put,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { AuthGuard } from '../users/guards/auth.guards';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { Template } from './template.entity';
import { User } from '../users/user.entity';
import { TemplateDto } from './template.dto';

@Controller('template')
@UseGuards(AuthGuard)
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @Post('/create')
  async createTemplate(@Body() templateDto: TemplateDto): Promise<Template> {
    return this.templateService.createTemplate(templateDto);
  }

  @Get('/user')
  async getUserTemplates(@CurrentUser() user: User): Promise<Template[]> {
    return this.templateService.getUserTemplates(user);
  }

  @Get('/:id/preview')
  async getTemplatePreview(@Param('id') id: number): Promise<string> {
    return this.templateService.getTemplatePreview(id);
  }

  @Put('/:id')
  async updateTemplate(@Body() TemplateDto: TemplateDto): Promise<Template> {
    return this.templateService.updateTemplate(TemplateDto);
  }

  @Delete('/:id')
  async deleteTemplate(@Param('id') id: number): Promise<void> {
    return this.templateService.deleteTemplate(id);
  }
}
