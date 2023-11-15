package com.ssafy.pjt.controller;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.pjt.model.dto.SearchCondition;
import com.ssafy.pjt.model.dto.User;
import com.ssafy.pjt.model.service.UserService;
import com.ssafy.pjt.util.JwtUtil;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.ApiOperation;

@RequestMapping("/userapi")
@RestController
@CrossOrigin("*")
public class UserRestController {
	
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private UserService uService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@GetMapping("/user")
	@ApiOperation(value = "등록된 모든 사용자 정보를 반환한다.", response = User.class)
	public ResponseEntity<?> selectAllUsers(HttpServletRequest request)  {
		
		try {
			List<User> users = uService.getAllUsers();
			if (users != null && users.size() > 0) {
				return new ResponseEntity<List<User>>(users, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	
//	@GetMapping("/user")
//	public List<User> getList(){
//		List<User> list = uService.getAllUsers();
//		return list;
//	}
	
	
	@GetMapping("/user/{id}")
	@ApiOperation(value = "{id}에 해당하는 사용자 정보를 반환한다.", response = User.class)
	public ResponseEntity<?> selectById(@PathVariable String id) {
		try {
			User user = uService.getUserById(id);
			if (user != null) {
				return new ResponseEntity<User>(user, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	
	@GetMapping("/user/search")
	@ApiOperation(value = "SearchCondition 에 부합하는 조건을 가진 사용자 목록을 반환한다.", response = User.class)
	public ResponseEntity<?> searchByconditon(SearchCondition con) {
		System.out.println(con);
		try {
			List<User> users = uService.getByCondition(con);
			if (users != null && users.size() > 0) {
				return new ResponseEntity<List<User>>(users, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	
	
	
	
	
	

//	@PostMapping("/user")
//	public String signUp(@RequestBody User user) {
//		int result = uService.saveUser(user);
//		if(result == 0) {
//			return FAIL;
//		} else {
//			return SUCCESS;
//		}
//	}
	
	
	@PostMapping("/user/login")
	@ApiOperation(value = "DB에 일치하는 사용자 정보가 있는지 확인한다.", response = Integer.class)
	public ResponseEntity<?> login(@RequestBody User user) throws UnsupportedEncodingException {
		System.out.println(user.getUserId());
		System.out.println(user.getUserPwd());
		
		User dbUser = uService.getUserById(user.getUserId());
		System.out.println(dbUser);
		
		if(dbUser != null && dbUser.getUserPwd().equals(user.getUserPwd())) {
			// DB에 일치하는 유저가 있다면 유저 객체 자체를 보낸다. => 토큰을 만들어서 보낸다.
			
			String token = Jwts.builder()
					.claim("id", dbUser.getUserId())
					.setExpiration(new Date(System.currentTimeMillis() + 1000*60))
					.signWith(SignatureAlgorithm.HS256, "SERVER_SECRET_KEY".getBytes("UTF-8"))
					.compact();
			
			System.out.println(token);
			
			
			return new ResponseEntity<String>(token, HttpStatus.OK);
		} 
		
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);

	}


	
	
	
//	public String login(@RequestBody User user) {
//		User loginUser = uService.getUserById(user.getUserId());
//		if(loginUser != null && loginUser.getUserPwd().equals(user.getUserPwd())) {
//			return "success";
//		} else {
//			return "fail";
//		}
//	}
	
	@PostMapping("/logout")
	@ApiOperation(value = "사용자 로그 아웃.", response = Integer.class)
	public ResponseEntity<Map<String, Object>> logout() {
	    Map<String, Object> result = new HashMap<>();
	    HttpStatus status;

	    result.put("message", SUCCESS);
	    status = HttpStatus.OK;

	    return new ResponseEntity<>(result, status);
	}
	
	@PostMapping("/user")
	@ApiOperation(value = "사용자 정보를 삽입한다.", response = Integer.class)
	public ResponseEntity<?> insertUser(@RequestBody User user) {
		try {
			int result = uService.saveUser(user);
			return new ResponseEntity<Integer>(result, HttpStatus.CREATED);

		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	@PutMapping("/user")
	@ApiOperation(value = "사용자 정보를 수정한다.", response = Integer.class)
	public ResponseEntity<?> updateUser(@RequestBody User user) {
		System.out.println(user);
		try {
			int result = uService.modifyUser(user);
			return new ResponseEntity<Integer>(result, HttpStatus.OK);

		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	@DeleteMapping("/user/{id}")
	@ApiOperation(value = "{id} 에 해당하는 사용자 정보를 삭제한다.", response = Integer.class)
	public ResponseEntity<?> deleteUser(@PathVariable String id) {
		try {
			int result = uService.removeUser(id);
			return new ResponseEntity<Integer>(result, HttpStatus.OK);

		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	
//	public String logout(HttpSession session) {
//		session.invalidate();
//		return "success";
//	}
	
	
	
	private ResponseEntity<?> exceptionHandling(Exception e) {
		e.printStackTrace();
		return new ResponseEntity<String>("Sorry: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
}
