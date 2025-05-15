package DAD.Big_Olympics;

import com.zaxxer.hikari.HikariDataSource;
import jakarta.annotation.PostConstruct;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ConnectionMonitor {

    private final HikariDataSource dataSource;

    public ConnectionMonitor(HikariDataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Scheduled(fixedRate = 10000) // every 10 seconds
    public void logPoolStats() {
        var pool = dataSource.getHikariPoolMXBean();
        System.out.println("Active: " + pool.getActiveConnections() +
                           ", Idle: " + pool.getIdleConnections() +
                           ", Total: " + pool.getTotalConnections() +
                           ", Threads Awaiting: " + pool.getThreadsAwaitingConnection());
    }
}