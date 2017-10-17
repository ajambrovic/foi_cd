package hr.gov.uprava.zupit.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import hr.gov.uprava.zupit.domain.SampleType;
import hr.gov.uprava.zupit.services.TestService;

@RestController
public class SampleTypeController {

	@Autowired
	TestService testService;

	@RequestMapping("/sampleType/getAllMock")
	public ResponseEntity<List<SampleType> > getAllMock() throws IOException {
		//ClassPathResource jsonFile = new ClassPathResource("data.json");
		
		List<SampleType> sampleList = testService.getSampleTypes();
		
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType("application/json"))
				.body(sampleList);
	}

	@RequestMapping("/sampleType/getMenuItems")
	public ResponseEntity<InputStreamResource> getMenuItems() throws IOException {
		ClassPathResource jsonFile = new ClassPathResource("menu.json");

		return ResponseEntity.ok().contentLength(jsonFile.contentLength())
				.contentType(MediaType.parseMediaType("application/json"))
				.body(new InputStreamResource(jsonFile.getInputStream()));
	}

	// TODO:
	// https://www.owasp.org/index.php/OWASP_AJAX_Security_Guidelines#Always_return_JSON_with_an_Object_on_the_outside
	@RequestMapping("/sampleType/getAll")
	public List<SampleType> getSampleTypes() {
		return testService.getSampleTypes();
	}

	@RequestMapping(value = "/sampleType/delete", method = RequestMethod.POST)
	public String deleteSampleType(@RequestBody SampleType sampleType) {
		testService.deleteSampleType(sampleType);
		return "{\"message\" : \"OK\"}";
	}

	@RequestMapping(value = "/sampleType/save", method = RequestMethod.POST)
	public SampleType saveSampleType(@RequestBody SampleType sampleType) {
		return testService.saveSampleType(sampleType);
	}

	@RequestMapping(value = "/sampleType/getSampleType/{id}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<InputStreamResource> getSampleType(@PathVariable("id") long id) throws IOException {
		ClassPathResource jsonFile = new ClassPathResource("single.json");
		return ResponseEntity.ok().contentLength(jsonFile.contentLength())
				.contentType(MediaType.parseMediaType("application/json"))
				.body(new InputStreamResource(jsonFile.getInputStream()));
	}

}
