import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './schema/blogs.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  findAll(): Promise<Blog[]> {
    return this.blogsRepository.find();
  }

  findOne(id: string): Promise<Blog | null> {
    return this.blogsRepository.findOneBy({ id });
  }
  async create(blog: Blog): Promise<Blog> {
    const newBlog = this.blogsRepository.create(blog);
    return this.blogsRepository.save(newBlog);
  }

  async update(id: string, updatedBlog: Blog): Promise<Blog | undefined> {
    const existingBlog = await this.blogsRepository.findOneBy({ id });

    if (!existingBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    const updatedEntity = await this.blogsRepository.save({
      ...existingBlog,
      ...updatedBlog,
    });

    return updatedEntity;
  }

  async remove(id: string): Promise<void> {
    await this.blogsRepository.delete(id);
  }
}
