package demo.demo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import demo.demo.dal.LessonRepository;
import demo.demo.model.Lesson;


@Service
public class LessonServiceImpl implements LessonService {
  //יודע להזריק את המופע המתאים לכאן //IoC //באופן זה 
    @Autowired
    private LessonRepository rep;

    @Override
    public void addLesson(Lesson l) {
        if(rep.existsById(l.getId()))
            throw new RuntimeException("Cannot add Lesson with the code "+l.getId()+" because it already exists.");
        rep.save(l);
    }

    @Override
    public void updateLesson(Lesson l) {
        if(!rep.existsById(l.getId()))
            throw new RuntimeException("Cannot update Lesson with the code "+l.getId()+" because it does not exist.");
        rep.save(l);
    }

    @Override
    public void deleteLesson(long idLesson) {
        rep.deleteById(idLesson);
    }

    @Override
    public List<Lesson> getAll() {
        return (List<Lesson>)rep.findAll();
    }

    @Override
    public Lesson getByIdLesson(long idLesson) {       
        return rep.findById(idLesson).get();
    }

}