package hr.gov.uprava.zupit.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import hr.gov.uprava.zupit.dao.TestDAO;
import hr.gov.uprava.zupit.domain.SampleType;

@Component
public class TestService {
	@Autowired
	private TestDAO testDAO;

	public List<SampleType> getSampleTypes() {
		return testDAO.getSampleTypes();
	}

	@Transactional
	public void deleteSampleType(final SampleType sampleType) {
		testDAO.deleteSampleType(sampleType);
	}

	@Transactional
	public SampleType saveSampleType(final SampleType sampleType) {
		if (sampleType.getId() == null) {
			testDAO.insertSampleType(sampleType);
		} else {
			testDAO.updateSampleType(sampleType);
		}
		return sampleType;
	}

}
