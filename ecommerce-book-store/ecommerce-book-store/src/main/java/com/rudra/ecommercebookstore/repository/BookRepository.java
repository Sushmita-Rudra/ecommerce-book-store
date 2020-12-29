package com.rudra.ecommercebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rudra.ecommercebookstore.entity.Book;

public interface BookRepository extends JpaRepository<Book,Long> {

}
