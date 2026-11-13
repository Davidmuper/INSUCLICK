package com.example.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.AuthService;

/**
 * API REST de autenticación para el portal (Vercel).
 *   POST /api/auth/registro
 *   POST /api/auth/login
 * Las respuestas usan el mismo formato que auth.js: { ok, msg } o { ok, user }.
 * Nunca se devuelve la contraseña ni su hash.
 */
@RestController
@RequestMapping("/api/auth")
// CORS: solo el portal en Vercel y pruebas locales pueden llamar a esta API.
@CrossOrigin(originPatterns = { "https://*.vercel.app", "http://localhost:*", "http://127.0.0.1:*" })
public class AuthController {

    private static final String EMAIL_REGEX = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$";

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /** Datos que envía registro.html. */
    public record RegistroRequest(String nombre, String email, String telefono, String password, String rol) {}

    /** Datos que envía login.html. */
    public record LoginRequest(String email, String password) {}

    /** Lo único que se devuelve del usuario (sin contraseña). */
    public record UsuarioResponse(Long id, String nombre, String email, String telefono, String rol) {}

    @PostMapping("/registro")
    public ResponseEntity<Map<String, Object>> registro(@RequestBody RegistroRequest req) {
        String nombre = limpiar(req.nombre());
        String email = limpiar(req.email()).toLowerCase();
        String rol = limpiar(req.rol()).toLowerCase();
        String password = req.password() == null ? "" : req.password();

        if (nombre.length() < 3) return error(HttpStatus.BAD_REQUEST, "El nombre debe tener al menos 3 caracteres.");
        if (!email.matches(EMAIL_REGEX)) return error(HttpStatus.BAD_REQUEST, "Correo electrónico no válido.");
        if (password.length() < 6) return error(HttpStatus.BAD_REQUEST, "La contraseña debe tener mínimo 6 caracteres.");
        if (!AuthService.ROLES_PERMITIDOS.contains(rol)) return error(HttpStatus.BAD_REQUEST, "Rol no válido.");

        AuthService.Resultado r = authService.registrar(nombre, email, limpiar(req.telefono()), password, rol);
        if (r.error() != null) return error(HttpStatus.CONFLICT, r.error());
        return ok(HttpStatus.CREATED, r);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest req) {
        String email = limpiar(req.email()).toLowerCase();
        String password = req.password() == null ? "" : req.password();
        if (email.isEmpty() || password.isEmpty()) {
            return error(HttpStatus.BAD_REQUEST, "Correo y contraseña son obligatorios.");
        }
        AuthService.Resultado r = authService.login(email, password);
        if (r.error() != null) return error(HttpStatus.UNAUTHORIZED, r.error());
        return ok(HttpStatus.OK, r);
    }

    private static String limpiar(String s) {
        return s == null ? "" : s.trim();
    }

    private static ResponseEntity<Map<String, Object>> error(HttpStatus status, String msg) {
        return ResponseEntity.status(status).body(Map.of("ok", false, "msg", msg));
    }

    private static ResponseEntity<Map<String, Object>> ok(HttpStatus status, AuthService.Resultado r) {
        var u = r.usuario();
        var user = new UsuarioResponse(u.getId(), u.getNombre(), u.getEmail(), u.getTelefono(), r.rol());
        return ResponseEntity.status(status).body(Map.of("ok", true, "user", user));
    }
}
