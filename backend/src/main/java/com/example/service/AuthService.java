package com.example.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Rol;
import com.example.model.Usuario;
import com.example.model.UsuarioRol;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

/**
 * Lógica de registro e inicio de sesión.
 * Las contraseñas se guardan cifradas con BCrypt (no se pueden "descifrar").
 */
@Service
@Transactional
public class AuthService {

    /** Roles permitidos en el portal (coinciden con registro.html). */
    public static final List<String> ROLES_PERMITIDOS = List.of("comprador", "vendedor");

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PersistenceContext
    private EntityManager em;

    /** Resultado simple: el usuario y su rol, o un mensaje de error. */
    public record Resultado(Usuario usuario, String rol, String error) {
        static Resultado error(String msg) { return new Resultado(null, null, msg); }
    }

    public Resultado registrar(String nombre, String email, String telefono, String password, String rol) {
        if (buscarPorEmail(email) != null) {
            return Resultado.error("El correo ya está registrado.");
        }
        Usuario u = new Usuario();
        u.setNombre(nombre);
        u.setEmail(email);
        u.setTelefono(telefono);
        u.setEstado("ACTIVO");
        u.setFechaRegistro(LocalDateTime.now());
        u.setPasswordHash(encoder.encode(password));
        em.persist(u);

        Rol r = obtenerOCrearRol(rol);
        em.persist(new UsuarioRol(u.getId(), r.getId()));
        return new Resultado(u, rol, null);
    }

    @Transactional(readOnly = true)
    public Resultado login(String email, String password) {
        Usuario u = buscarPorEmail(email);
        // Mismo mensaje si el correo no existe o la clave falla: no revela qué correos existen.
        if (u == null || u.getPasswordHash() == null || !encoder.matches(password, u.getPasswordHash())) {
            return Resultado.error("Correo o contraseña incorrectos.");
        }
        UsuarioRol ur = em.find(UsuarioRol.class, u.getId());
        Rol r = ur != null && ur.getIdRol() != null ? em.find(Rol.class, ur.getIdRol()) : null;
        String rol = r != null ? r.getNombre().toLowerCase() : "comprador";
        return new Resultado(u, rol, null);
    }

    private Usuario buscarPorEmail(String email) {
        return em.createQuery("SELECT u FROM Usuario u WHERE LOWER(u.email) = :e", Usuario.class)
                .setParameter("e", email.toLowerCase())
                .getResultStream().findFirst().orElse(null);
    }

    /** Busca el rol por nombre (sin importar mayúsculas); solo lo crea si no existe, evitando duplicados. */
    private Rol obtenerOCrearRol(String rol) {
        String nombre = rol.toUpperCase();
        Rol r = em.createQuery("SELECT r FROM Rol r WHERE UPPER(r.nombre) = :n ORDER BY r.id", Rol.class)
                .setParameter("n", nombre)
                .getResultStream().findFirst().orElse(null);
        if (r == null) {
            r = new Rol(nombre, "Rol " + rol + " del portal INSUCLICK", "ACTIVO");
            em.persist(r);
        }
        return r;
    }
}
