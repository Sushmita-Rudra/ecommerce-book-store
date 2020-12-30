package com.rudra.ecommercebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.rudra.ecommercebookstore.entity.BookCategory;

@RepositoryRestResource(collectionResourceRel = "bookCategories", path = "book-category")
@CrossOrigin("http://localhost:4200")
public interface BookCategoryRepository  extends JpaRepository<BookCategory, Long>{

}
