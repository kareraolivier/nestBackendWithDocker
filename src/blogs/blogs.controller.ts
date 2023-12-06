import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  Param,
  //   Req,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './schema/blogs.entity';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  findAll(): Promise<Blog[]> {
    return this.blogsService.findAll();
  }
  @Post()
  create(@Body() blog: Blog): Promise<Blog> {
    return this.blogsService.create(blog);
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Blog | undefined> {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() blog: Blog,
  ): Promise<Blog | undefined> {
    return this.blogsService.update(id, blog);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.blogsService.remove(id);
  }
}
