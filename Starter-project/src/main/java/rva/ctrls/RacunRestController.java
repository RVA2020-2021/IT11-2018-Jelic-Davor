package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Racun;
import rva.repository.RacunRepository;

@RestController
public class RacunRestController {
	
	@Autowired //kreira bin i tako omogucava dependencyInjection
	private RacunRepository racunRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate; 
	
	@GetMapping("racun")
	public Collection<Racun> getRacuni(){ //vraca sve racune
		return racunRepository.findAll();
	}
	
	@GetMapping("racun/{id}")
	public Racun getRacun(@PathVariable("id") Integer id) { //vraca samo racun sa prosledjenim id-om
		return racunRepository.getOne(id);
	}
	
	@GetMapping("racunNacinPlacanja/{nacinPlacanja}")
	public Collection<Racun> getRacunByNacinPlacanja(@PathVariable() String nacinPlacanja) { //vraca racune po nacinu placanja
		return racunRepository.findByNacinPlacanjaContainingIgnoreCase(nacinPlacanja);
	}
	
	@PostMapping("racun")
	public ResponseEntity<Racun> insertRacun(@RequestBody Racun racun){
		if(!racunRepository.existsById(racun.getId())) {
			racunRepository.save(racun);
			return new ResponseEntity<Racun>(HttpStatus.OK);
		}
		return new ResponseEntity<Racun>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("racun")
	public ResponseEntity<Racun> updateRacun(@RequestBody Racun racun){
		if(!racunRepository.existsById(racun.getId())) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		}
		racunRepository.save(racun);
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
	
	@DeleteMapping("racun/{id}")
	public ResponseEntity<Racun> deleteRacun(@PathVariable("id") Integer id){
		if(!racunRepository.existsById(id)) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		}
		racunRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute("INSERT INTO \"racun\" (\"id\", \"datum\", \"nacin_placanja\") " 
		+ "VALUES (-100, to_date('01.01.2020.', 'dd.mm.yyyy.'), 'gotovina')");
		}
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
}
