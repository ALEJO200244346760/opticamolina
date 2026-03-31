// Archivo: src/main/java/opticamolina/demo/service/PaymentService.java
package opticamolina.demo.service;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.*;
import com.mercadopago.resources.preference.Preference;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map; // <--- AGREGAR ESTA IMPORTACIÓN

@Service
public class PaymentService {

    @Value("${mercadopago.access.token}")
    private String accessToken;

    // CAMBIADO: Ahora devuelve un Mapa con ID y URL
    public Map<String, String> createPreference(String title, Double price, Integer quantity) {
        try {
            MercadoPagoConfig.setAccessToken(accessToken);

            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .title(title)
                    .quantity(quantity)
                    .unitPrice(new BigDecimal(price))
                    .currencyId("ARS")
                    .build();

            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(itemRequest);

            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                    .success("https://opticamolina.vercel.app/success")
                    .pending("https://opticamolina.vercel.app/pending")
                    .failure("https://opticamolina.vercel.app/failure")
                    .build();

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backUrls)
                    .autoReturn("approved")
                    .build();

            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            // RETORNO CORREGIDO: Mandamos ambos datos al Controller
            return Map.of(
                    "id", preference.getId(),
                    "url", preference.getInitPoint()
            );

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error al crear la preferencia: " + e.getMessage());
        }
    }
}