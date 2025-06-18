package demo.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import demo.demo.dal.LessonRegistrationRepository;
import demo.demo.model.LessonRegistration;
import demo.demo.model.LessonRegistrationId;

@Service
public class LessonRegistrationServiceImpl implements LessonRegistrationSevrice {

    @Autowired
    private LessonRegistrationRepository rep;

    @Override
    public void addLessonRegistration(LessonRegistration l) {
        if(rep.existsById(l.getId()))
            throw new RuntimeException("Cannot add LessonRegistration with id " + l.getId() + " because it already exists.");
        rep.save(l);
    }

    @Override
    public void updateLessonRegistration(LessonRegistration l) {
        if(!rep.existsById(l.getId()))
            throw new RuntimeException("Cannot update LessonRegistration with id " + l.getId() + " because it does not exist.");
        rep.save(l);
    }

    @Override
    public void deleteLessonRegistration(LessonRegistrationId idLessonRegistration) {
        rep.deleteById(idLessonRegistration);
    }

    @Override
    public List<LessonRegistration> getAll() {
        return (List<LessonRegistration>) rep.findAll();
    }

    @Override
    public LessonRegistration getByIdLessonRegistration(LessonRegistrationId idLessonRegistration) {
        return rep.findById(idLessonRegistration)
                  .orElseThrow(() -> new RuntimeException("LessonRegistration with id " + idLessonRegistration + " not found"));
    }
}
