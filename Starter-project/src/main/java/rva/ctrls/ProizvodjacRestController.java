package rva.ctrls;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Proizvodjac;
import rva.jpa.Racun;
import rva.repository.ProizvodjacRepository;

@CrossOrigin
@RestController
@Api(tags = {"Proizvo�a� CRUD operacije"})
public class ProizvodjacRestController {
	
	@Autowired
	private ProizvodjacRepository proizvodjacRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("proizvodjac")
	@ApiOperation(value = "Vra�a kolekciju svih proizvo�a�a iz baze podataka")
	public Collection<Proizvodjac> getProizvodjaci(){
		return proizvodjacRepository.findAll();
	}
	
	@GetMapping("proizvodjac/{id}")
	@ApiOperation(value = "Vra�a proizvo�a�a u odnosu na prosle�enu vrednost path varijable id")
	public Proizvodjac getProizvodjac(@PathVariable("id") Integer id) {
		return proizvodjacRepository.getOne(id);
	}
	
	@GetMapping("proizvodjacNaziv/{naziv}")
	@ApiOperation(value = "Vra�a kolekciju proizvo�a�a koji imaju naziv koji sadr�i vrednost prosle�enu u okviru path varijable naziv")
	public Collection<Proizvodjac> getProizvodjacByNaziv(@PathVariable("naziv") String naziv) {
		return proizvodjacRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("proizvodjac")
	@ApiOperation(value = "Dodaje novog proizvo�a�a u bazu podataka")
	public ResponseEntity<Proizvodjac> insertProizvodjac(@RequestBody Proizvodjac proizvodjac){
		if(!proizvodjacRepository.existsById(proizvodjac.getId())) {
			proizvodjacRepository.save(proizvodjac);
			return new ResponseEntity<Proizvodjac>(HttpStatus.OK);
		}
		return new ResponseEntity<Proizvodjac>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("proizvodjac")
	@ApiOperation(value = "Modifikuje postoje�eg proizvo�a�a")
	public ResponseEntity<Proizvodjac> updateProizvodjac(@RequestBody Proizvodjac proizvodjac){
		if(!proizvodjacRepository.existsById(proizvodjac.getId())) {
			return new ResponseEntity<Proizvodjac>(HttpStatus.NO_CONTENT);
		}
		proizvodjacRepository.save(proizvodjac);
		return new ResponseEntity<Proizvodjac>(HttpStatus.OK);
	}
	
	@Transactional
	@DeleteMapping("proizvodjac/{id}")
	@ApiOperation(value = "Bri�e proizvo�a�a u odnosu na vrednost prosle�ene path varijable id")
	public ResponseEntity<Racun> deleteRacun(@PathVariable("id") Integer id){
		if(!proizvodjacRepository.existsById(id)) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("DELETE FROM stavka_racuna WHERE proizvod in (select id from proizvod where proizvodjac=" + id + ")");
		jdbcTemplate.execute("DELETE FROM proizvod WHERE proizvodjac=" + id);
		proizvodjacRepository.deleteById(id);
		proizvodjacRepository.flush();
		if(id == -100) {
			jdbcTemplate.execute("INSERT INTO \"proizvodjac\" (\"id\", \"naziv\", \"adresa\", \"kontakt\") " 
		+ "VALUES (-100, 'Test naziv', 'Test adresa', 'Test kontakt')");
		}
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
}
