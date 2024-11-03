import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './template.entity';
import * as Handlebars from 'handlebars';
import { User } from '../users/user.entity';
import { TemplateDto } from './template.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly repo: Repository<Template>,
  ) {}

  async createTemplate(templateDto: TemplateDto): Promise<Template> {
    const template = this.repo.create(templateDto);
    return this.repo.save(template);
  }

  async getUserTemplates(user: User): Promise<Template[]> {
    return this.repo.find({ where: { user } });
  }

  async getTemplatePreview(id: number): Promise<string> {
    const template = await this.repo.findOne({ where: { id } });
    if (!template) {
      throw new NotFoundException('template not found');
    }

    const compileTemplate = Handlebars.compile(template.templateText);

    return compileTemplate(template.preview);
  }

  async updateTemplate(templateDto: TemplateDto): Promise<Template> {
    const template = await this.repo.preload(templateDto);

    if (!template) {
      throw new NotFoundException('template not found');
    }

    return this.repo.save(template);
  }

  async deleteTemplate(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
