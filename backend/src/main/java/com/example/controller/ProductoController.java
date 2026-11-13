
package com.example.controller;

import com.example.model.Producto;
import com.example.service.CrudService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(originPatterns = {
    "http://localhost:*",
    "http://127.0.0.1:*",
    "https://*.vercel.app"
})
public class ProductoController {

    private final CrudService crudService;

    public ProductoController(CrudService crudService) {
        this.crudService = crudService;
    }

    // Consultar productos activos desde Neon
    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos() {

        List<Producto> productos =
            crudService.listarTodos(Producto.class);

        List<Producto> activos = productos.stream()
            .filter(p -> p.getEstado() != null
                && p.getEstado().equalsIgnoreCase("ACTIVO"))
            .collect(Collectors.toList());

        return ResponseEntity.ok(activos);
    }

    // Consultar un producto por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Producto> buscarProducto(
            @PathVariable Long id) {

        Producto producto =
            crudService.buscarPorId(Producto.class, id);

        if (producto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(producto);
    }
}
