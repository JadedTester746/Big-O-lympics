package DAD.Big_Olympics;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

public class ServletInitializer extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {

		return application.sources(BigOlympicsApplication.class);
	}

}
