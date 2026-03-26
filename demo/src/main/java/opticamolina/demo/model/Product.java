package opticamolina.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Datos principales
    private String nombre;
    private String marca;
    private String descripcion;
    private Double precio;
    private Integer stock;

    // Especificaciones
    private String color;
    private String tamanio;
    private String material;
    private String forma;

    // Imagen
    private String imagenUrl;

    // Descuento
    private Boolean tieneDescuento;
    private Integer porcentajeDescuento;

    // Relación
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}