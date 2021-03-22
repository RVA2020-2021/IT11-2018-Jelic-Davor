package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Racun;
import rva.repository.RacunRepository;

@RestController
public class RacunRestController {
	
	@Autowired //kreira bin i tako omogucava dependencyInjection
	private RacunRepository racunRepository;
	
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
}
