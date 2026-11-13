
package com.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "interacciones_productos")
public class InteraccionProducto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productoId;
    private String nombreProducto;
    private String emailUsuario;
    private String accion;
    private LocalDateTime fecha;

    public InteraccionProducto() {
    }

    public InteraccionProducto(Long productoId, String nombreProducto,
            String emailUsuario, String accion) {
        this.productoId = productoId;
        this.nombreProducto = nombreProducto;
        this.emailUsuario = emailUsuario;
        this.accion = accion;
        this.fecha = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public Long getProductoId() { return productoId; }
    public String getNombreProducto() { return nombreProducto; }
    public String getEmailUsuario() { return emailUsuario; }
    public String getAccion() { return accion; }
    public LocalDateTime getFecha() { return fecha; }

    public void setId(Long id) { this.id = id; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }
    public void setNombreProducto(String nombreProducto) { this.nombreProducto = nombreProducto; }
    public void setEmailUsuario(String emailUsuario) { this.emailUsuario = emailUsuario; }
    public void setAccion(String accion) { this.accion = accion; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
}
