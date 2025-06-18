package demo.demo.mapper;
/*
import demo.demo.dto.MembershipDTO;
import demo.demo.dto.UserDTO;
import demo.demo.dto.LessonDTO;
import demo.demo.dto.LessonRegistrationDTO;

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
    LessonDTO lessonToDTO(Lesson lesson);

    @Mapping(target = "registrations", ignore = true)
    Lesson lessonDTOToEntity(LessonDTO dto);

    // -------- LessonRegistration --------
    @Mapping(source = "user.code", target = "userId")
    @Mapping(source = "lesson.id", target = "lessonId")
    LessonRegistrationDTO lessonRegistrationToDTO(LessonRegistration entity);

    @Mapping(source = "userId", target = "user.code")
    @Mapping(source = "lessonId", target = "lesson.id")
    LessonRegistration lessonRegistrationDTOToEntity(LessonRegistrationDTO dto);

    // המרות רשימות
    List<MembershipDTO> membershipsToDTOs(List<Membership> memberships);
    List<Membership> membershipsDTOsToEntities(List<MembershipDTO> dtos);

    List<UserDTO> usersToDTOs(List<User> users);
    List<User> usersDTOsToEntities(List<UserDTO> dtos);

    List<LessonDTO> lessonsToDTOs(List<Lesson> lessons);
    List<Lesson> lessonsDTOsToEntities(List<LessonDTO> dtos);

    List<LessonRegistrationDTO> lessonRegistrationsToDTOs(List<LessonRegistration> entities);
    List<LessonRegistration> lessonRegistrationsDTOsToEntities(List<LessonRegistrationDTO> dtos);
    
}

*/

//צריך להזריק אחכ לSERVICE  !!!!!!!!!!!!!!!!!!!!
/*package demo.demo.mapper;

import demo.demo.dto.LessonDTO;
import demo.demo.dto.LessonRegistrationDTO;
import demo.demo.dto.MembershipDTO;
import demo.demo.dto.UserDTO;
import demo.demo.model.Lesson;
import demo.demo.model.LessonRegistration;
import demo.demo.model.Membership;
import demo.demo.model.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-18T20:36:35+0300",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class BodyToneMapperImpl implements BodyToneMapper {

    @Override
    public MembershipDTO membershipToDTO(Membership membership) {
        if ( membership == null ) {
            return null;
        }

        MembershipDTO membershipDTO = new MembershipDTO();

        membershipDTO.setDescribition( membership.getDescribition() );
        membershipDTO.setId( membership.getId() );
        membershipDTO.setName( membership.getName() );

        return membershipDTO;
    }

    @Override
    public Membership membershipDTOToEntity(MembershipDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Membership membership = new Membership();

        membership.setDescribition( dto.getDescribition() );
        membership.setId( dto.getId() );
        membership.setName( dto.getName() );

        return membership;
    }

    @Override
    public UserDTO userToDTO(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setMembershipId( userMembershipId( user ) );
        userDTO.setCode( user.getCode() );
        userDTO.setEmail( user.getEmail() );
        userDTO.setMembershipEnd( user.getMembershipEnd() );
        userDTO.setMembershipStart( user.getMembershipStart() );
        userDTO.setName( user.getName() );
        userDTO.setPhone( user.getPhone() );

        return userDTO;
    }

    @Override
    public User userDTOToEntity(UserDTO dto) {
        if ( dto == null ) {
            return null;
        }

        User user = new User();

        user.setMembership( userDTOToMembership( dto ) );
        user.setCode( dto.getCode() );
        user.setEmail( dto.getEmail() );
        user.setMembershipEnd( dto.getMembershipEnd() );
        user.setMembershipStart( dto.getMembershipStart() );
        user.setName( dto.getName() );
        user.setPhone( dto.getPhone() );

        return user;
    }

    @Override
    public LessonViewDTO lessonToDTO(Lesson lesson) {
        if ( lesson == null ) {
            return null;
        }

        LessonViewDTO lessonViewDTO = new LessonViewDTO();

        lessonViewDTO.setDate( lesson.getDate() );
        lessonViewDTO.setFemaleOnly( lesson.getFemaleOnly() );
        lessonViewDTO.setId( lesson.getId() );
        lessonViewDTO.setMaxCapacity( lesson.getMaxCapacity() );
        lessonViewDTO.setName( lesson.getName() );
        lessonViewDTO.setTime( lesson.getTime() );

        return lessonViewDTO;
    }

    @Override
    public Lesson lessonDTOToEntity(LessonViewDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Lesson lesson = new Lesson();

        lesson.setDate( dto.getDate() );
        lesson.setFemaleOnly( dto.getFemaleOnly() );
        lesson.setId( dto.getId() );
        lesson.setMaxCapacity( dto.getMaxCapacity() );
        lesson.setName( dto.getName() );
        lesson.setTime( dto.getTime() );

        return lesson;
    }

    @Override
    public LessonRegistrationViewDTO lessonRegistrationToDTO(LessonRegistration entity) {
        if ( entity == null ) {
            return null;
        }

        LessonRegistrationViewDTO lessonRegistrationViewDTO = new LessonRegistrationViewDTO();

        lessonRegistrationViewDTO.setUserId( entityUserCode( entity ) );
        lessonRegistrationViewDTO.setLessonId( entityLessonId( entity ) );
        lessonRegistrationViewDTO.setJoinedAt( entity.getJoinedAt() );
        lessonRegistrationViewDTO.setStatus( entity.getStatus() );

        return lessonRegistrationViewDTO;
    }

    @Override
    public LessonRegistration lessonRegistrationDTOToEntity(LessonRegistrationViewDTO dto) {
        if ( dto == null ) {
            return null;
        }

        LessonRegistration lessonRegistration = new LessonRegistration();

        lessonRegistration.setUser( lessonRegistrationViewDTOToUser( dto ) );
        lessonRegistration.setLesson( lessonRegistrationViewDTOToLesson( dto ) );
        lessonRegistration.setJoinedAt( dto.getJoinedAt() );
        lessonRegistration.setStatus( dto.getStatus() );

        return lessonRegistration;
    }

    @Override
    public List<MembershipDTO> membershipsToDTOs(List<Membership> memberships) {
        if ( memberships == null ) {
            return null;
        }

        List<MembershipDTO> list = new ArrayList<MembershipDTO>( memberships.size() );
        for ( Membership membership : memberships ) {
            list.add( membershipToDTO( membership ) );
        }

        return list;
    }

    @Override
    public List<Membership> membershipsDTOsToEntities(List<MembershipDTO> dtos) {
        if ( dtos == null ) {
            return null;
        }

        List<Membership> list = new ArrayList<Membership>( dtos.size() );
        for ( MembershipDTO membershipDTO : dtos ) {
            list.add( membershipDTOToEntity( membershipDTO ) );
        }

        return list;
    }

    @Override
    public List<UserDTO> usersToDTOs(List<User> users) {
        if ( users == null ) {
            return null;
        }

        List<UserDTO> list = new ArrayList<UserDTO>( users.size() );
        for ( User user : users ) {
            list.add( userToDTO( user ) );
        }

        return list;
    }

    @Override
    public List<User> usersDTOsToEntities(List<UserDTO> dtos) {
        if ( dtos == null ) {
            return null;
        }

        List<User> list = new ArrayList<User>( dtos.size() );
        for ( UserDTO userDTO : dtos ) {
            list.add( userDTOToEntity( userDTO ) );
        }

        return list;
    }

    @Override
    public List<LessonViewDTO> lessonsToDTOs(List<Lesson> lessons) {
        if ( lessons == null ) {
            return null;
        }

        List<LessonViewDTO> list = new ArrayList<LessonViewDTO>( lessons.size() );
        for ( Lesson lesson : lessons ) {
            list.add( lessonToDTO( lesson ) );
        }

        return list;
    }

    @Override
    public List<Lesson> lessonsDTOsToEntities(List<LessonViewDTO> dtos) {
        if ( dtos == null ) {
            return null;
        }

        List<Lesson> list = new ArrayList<Lesson>( dtos.size() );
        for ( LessonViewDTO lessonViewDTO : dtos ) {
            list.add( lessonDTOToEntity( lessonViewDTO ) );
        }

        return list;
    }

    @Override
    public List<LessonRegistrationViewDTO> lessonRegistrationsToDTOs(List<LessonRegistration> entities) {
        if ( entities == null ) {
            return null;
        }

        List<LessonRegistrationViewDTO> list = new ArrayList<LessonRegistrationViewDTO>( entities.size() );
        for ( LessonRegistration lessonRegistration : entities ) {
            list.add( lessonRegistrationToDTO( lessonRegistration ) );
        }

        return list;
    }

    @Override
    public List<LessonRegistration> lessonRegistrationsDTOsToEntities(List<LessonRegistrationViewDTO> dtos) {
        if ( dtos == null ) {
            return null;
        }

        List<LessonRegistration> list = new ArrayList<LessonRegistration>( dtos.size() );
        for ( LessonRegistrationViewDTO lessonRegistrationViewDTO : dtos ) {
            list.add( lessonRegistrationDTOToEntity( lessonRegistrationViewDTO ) );
        }

        return list;
    }

    private Long userMembershipId(User user) {
        if ( user == null ) {
            return null;
        }
        Membership membership = user.getMembership();
        if ( membership == null ) {
            return null;
        }
        Long id = membership.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    protected Membership userDTOToMembership(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        Membership membership = new Membership();

        membership.setId( userDTO.getMembershipId() );

        return membership;
    }

    private Long entityUserCode(LessonRegistration lessonRegistration) {
        if ( lessonRegistration == null ) {
            return null;
        }
        User user = lessonRegistration.getUser();
        if ( user == null ) {
            return null;
        }
        Long code = user.getCode();
        if ( code == null ) {
            return null;
        }
        return code;
    }

    private Long entityLessonId(LessonRegistration lessonRegistration) {
        if ( lessonRegistration == null ) {
            return null;
        }
        Lesson lesson = lessonRegistration.getLesson();
        if ( lesson == null ) {
            return null;
        }
        Long id = lesson.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    protected User lessonRegistrationViewDTOToUser(LessonRegistrationViewDTO lessonRegistrationViewDTO) {
        if ( lessonRegistrationViewDTO == null ) {
            return null;
        }

        User user = new User();

        user.setCode( lessonRegistrationViewDTO.getUserId() );

        return user;
    }

    protected Lesson lessonRegistrationViewDTOToLesson(LessonRegistrationViewDTO lessonRegistrationViewDTO) {
        if ( lessonRegistrationViewDTO == null ) {
            return null;
        }

        Lesson lesson = new Lesson();

        lesson.setId( lessonRegistrationViewDTO.getLessonId() );

        return lesson;
    }
}
*/