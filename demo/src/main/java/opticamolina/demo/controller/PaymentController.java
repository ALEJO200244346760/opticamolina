// Archivo: src/main/java/opticamolina/demo/controller/PaymentController.java
package opticamolina.demo.controller;

import opticamolina.demo.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*") // Permite que tu React en Vercel se comunique con Railway
public class PaymentController {

    @Autowired
    private org.springframework.beans.factory.ObjectProvider<PaymentService> paymentServiceProvider;

    @Autowired
    private PaymentService paymentService;

    /**
     * Endpoint para crear una preferencia de pago en Mercado Pago.
     * Recibe los datos del producto desde el frontend de React.
     */
    @PostMapping("/create")
    public Map<String, String> create(@RequestBody Map<String, Object> data) {
        try {
            // 1. Extraemos los datos del JSON enviado por React
            String title = (String) data.get("title");

            // Usamos una conversión segura para el precio por si llega como Integer o Double
            Double price = Double.valueOf(data.get("price").toString());

            // Usamos una conversión segura para la cantidad
            Integer quantity = Integer.valueOf(data.get("quantity").toString());

            // 2. Llamamos al Service que ahora devuelve un Map<String, String>
            // El mapa contiene: "id" (Preference ID) y "url" (Init Point)
            Map<String, String> response = paymentService.createPreference(title, price, quantity);

            // 3. Devolvemos el mapa completo al frontend
            return response;

        } catch (Exception e) {
            // Si algo falla, devolvemos un error descriptivo
            return Map.of("error", "No se pudo crear la preferencia de pago: " + e.getMessage());
        }
    }
}