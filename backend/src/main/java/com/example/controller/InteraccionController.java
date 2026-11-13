package com.example.controller;

import com.example.model.InteraccionProducto;
import com.example.service.CrudService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/interacciones")
@CrossOrigin(originPatterns = {
    "http://localhost:*",
    "http://127.0.0.1:*",
    "https://*.vercel.app"
})
public class InteraccionController {

    private final CrudService crudService;

    public InteraccionController(CrudService crudService) {
        this.crudService = crudService;
    }

    public record InteraccionRequest(
        Long productoId,
        String nombreProducto,
        String emailUsuario,
        String accion
    ) {}

    @PostMapping
    public ResponseEntity<?> registrar(
            @RequestBody InteraccionRequest request) {

        if (request.nombreProducto() == null ||
            request.nombreProducto().isBlank()) {

            return ResponseEntity.badRequest()
                .body(Map.of(
                    "ok", false,
                    "msg", "Producto requerido"
                ));
        }

        InteraccionProducto interaccion =
            new InteraccionProducto(
                request.productoId(),
                request.nombreProducto(),
                request.emailUsuario(),
                request.accion() == null ? "CLIC" : request.accion()
            );

        crudService.guardar(interaccion);

        return ResponseEntity.ok(
            Map.of(
                "ok", true,
                "msg", "Interacción registrada"
            )
        );
    }
}