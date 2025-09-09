package demo.demo.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();

        // המרה מ-String ל-LocalDate
        Converter<String, LocalDate> toLocalDate = 
            (MappingContext<String, LocalDate> ctx) -> 
                ctx.getSource() == null ? null : 
                    LocalDate.parse(ctx.getSource(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        mapper.addConverter(toLocalDate);
        return mapper;
    }
}
