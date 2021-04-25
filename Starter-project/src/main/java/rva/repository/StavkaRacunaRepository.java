package rva.repository;

import java.math.BigDecimal;
import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import rva.jpa.Racun;
import rva.jpa.StavkaRacuna;

public interface StavkaRacunaRepository extends JpaRepository<StavkaRacuna, Integer> {
	
	Collection<StavkaRacuna> findByRacun(Racun racun);
	Collection<StavkaRacuna> findByCenaLessThanOrderById(BigDecimal cena);
	
	@Query(value = "SELECT COALESCE(max(redni_broj)+1,1) FROM stavka_racuna WHERE racun = ?1", nativeQuery = true)
	Integer nextRbr(Integer racunId);
}
