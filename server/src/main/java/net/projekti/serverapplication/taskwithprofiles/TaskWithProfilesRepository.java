package net.projekti.serverapplication.taskwithprofiles;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TaskWithProfilesRepository extends JpaRepository<TaskWithProfiles, Integer>{
	
	@Query(value="SELECT * FROM task WHERE creator_id=:id OR performer_id=:id", nativeQuery=true)
	List<TaskWithProfiles> findAllTasksByProfileId(@Param("id") int id);
	
	@Query(value="SELECT * FROM task WHERE creator_id=:id", nativeQuery=true)
	List<TaskWithProfiles> findByCreatorId(@Param("id") int id);
	
	@Query(value="SELECT * FROM task WHERE performer_id=:id", nativeQuery=true)
	List<TaskWithProfiles> findByPerformerId(@Param("id") int id);
	
	@Query(value="SELECT * FROM task WHERE performer_id=:id AND status=:status", nativeQuery=true)
	List<TaskWithProfiles> findPerfomedTasksByStatus(@Param("id") int id, @Param("status") String status);
	
	
	List<TaskWithProfiles> findByLatitudeBetweenAndLongitudeBetween(Double minLat, Double maxLat, Double minLng, Double maxLng);
	
	
}
