package demo.demo.mapper;

import demo.demo.dto.Membership.MembershipDTO;
import demo.demo.dto.User.UserDTO;
import demo.demo.dto.Lesson.LessonViewDTO;
import demo.demo.dto.LessonRegistration.LessonRegistrationViewDTO;

import demo.demo.model.Membership;
import demo.demo.model.User;
import demo.demo.model.Lesson;
import demo.demo.model.LessonRegistration;

import org.mapstruct.*;
import java.util.List;

@Mapper(componentModel = "spring")
public interface BodyToneMapper {

    // -------- Membership --------
    MembershipDTO membershipToDTO(Membership membership);

    Membership membershipDTOToEntity(MembershipDTO dto);

    // -------- User --------
    @Mapping(source = "membership.id", target = "membershipId")
    UserDTO userToDTO(User user);

    @Mapping(source = "membershipId", target = "membership.id")
    User userDTOToEntity(UserDTO dto);

    // -------- Lesson --------
    @Mapping(target = "registrations", ignore = true) // נמנעים מלולאות רקורסיביות
    LessonViewDTO lessonToDTO(Lesson lesson);

    @Mapping(target = "registrations", ignore = true)
    Lesson lessonDTOToEntity(LessonViewDTO dto);

    // -------- LessonRegistration --------
    @Mapping(source = "user.code", target = "userId")
    @Mapping(source = "lesson.id", target = "lessonId")
    LessonRegistrationViewDTO lessonRegistrationToDTO(LessonRegistration entity);

    @Mapping(source = "userId", target = "user.code")
    @Mapping(source = "lessonId", target = "lesson.id")
    LessonRegistration lessonRegistrationDTOToEntity(LessonRegistrationViewDTO dto);

    // המרות רשימות
    List<MembershipDTO> membershipsToDTOs(List<Membership> memberships);
    List<Membership> membershipsDTOsToEntities(List<MembershipDTO> dtos);

    List<UserDTO> usersToDTOs(List<User> users);
    List<User> usersDTOsToEntities(List<UserDTO> dtos);

    List<LessonViewDTO> lessonsToDTOs(List<Lesson> lessons);
    List<Lesson> lessonsDTOsToEntities(List<LessonViewDTO> dtos);

    List<LessonRegistrationViewDTO> lessonRegistrationsToDTOs(List<LessonRegistration> entities);
    List<LessonRegistration> lessonRegistrationsDTOsToEntities(List<LessonRegistrationViewDTO> dtos);
}



//צריך להזריק אחכ לSERVICE  !!!!!!!!!!!!!!!!!!!!