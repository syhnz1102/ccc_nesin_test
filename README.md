# nesin
> nesin.com webrtc consulting service project (* with knowledgetalk)

### Release Note
```
# v0.9.5 (20/10/23)
- 상담사 화면 상담종료 클릭 시 브라우저 창도 닫아지도록 수정
- 방 생성시 roomId 직접 지정하도록 변경 (roomId 파라미터 필요)
- 학생이 입장 했을 때 상담사 화면의 이미지가 변경되도록 수정
- 이슈 2건 수정 완료
 + (v0.9.4 추가) 방 생성 후 제3자가 해당 방에 입장 시도 후 종료시 상담 중인 학생화면이 상담종료되는 현상
 + (v0.9.4 추가) 공유화면 선택 팝업의 취소버튼 클릭시 학생 화면 안 닫히는 현상

# v0.9.4 (20/10/16)
- 이슈 4건 수정 완료
 + 화면공유 종료시 화상통화 화면이 잠시 켜졌다가 꺼지는 현상
 + (v0.9.1 추가) 영상통화 -> 종료 -> 화면공유 -> 종료 시 영상통화 화면이 남아있는 문제
 + (v0.9.1 추가) 영상통화/화면공유 시작 후 바로 통화 종료를 하면, 학생 화면에서 자신의 영상만 나오며, 통화종료 되지 않는 현상 (blocked)
 + (v0.9.2 추가) 통화중 카메라/마이크 off 후 학생 화면에서 화면 숨김 버튼을 눌렀다가 다시 화상 화면을 켜는 경우 카메라/마이크 off가 적용되지 않는 현상

# v0.9.3 (20/10/15)
- 이슈 5건 수정 완료
 + 상담이나 공유 종료 후 재 통화 시 한쪽 영상 화면이 제대로 나오지 않는 현상
 + 학생이 화면 숨김 상태에서 통화 종료 후 재 통화 시 양쪽 다 영상 화면이 출력 되지 않는 현상
 + (v0.9.1 추가) 화면공유 -> 종료 후 동일한 브라우저에서 새 방을 생성해 화면공유 시, 종료 횟수만큼 화면공유가 중복실행되는 현상
 + (v0.9.1 추가) 화면공유 중 브라우저 팝업의 공유중지 클릭시 학생, 상담사 화면 안닫히는 현상
 + (v0.9.2 추가) 통화중 강제퇴장 클릭시 학생이 ok버튼을 누르기 전까지 양쪽 비디오가 꺼지지 않는 현상

# v0.9.2 (20/10/14)
- 강제 퇴장 기능 추가 (상담사 -> 학생 강제퇴장 가능)
- 이슈 4건 수정 완료
 + 통화 종료 후 다시 화상 진행 시 이전에 통화한 시간이 그대로 남아있음
 + 학생 통화 종료 시 Tab에 Red Dot(카메라 켜짐 아이콘) 없어지지 않는 현상
 + 학생과 상담사의 통화 시간이 불일치 되던 현상
 + 음소거 기능이 정상적으로 동작되지 않는 현상

# v0.9.1 (20/10/13)
- 상담사 화면 로고 삭제 및 userName 받도록 변경
- 학생 화면 로고 삭제 및 이름 input 삭제
- 이슈 4건 수정 완료
 + 디바이스 설정에 다시보지 않기 체크 후 통화 재 시작 시 디바이스 설정 팝업이 나오는 현상
 + 학생이 화면 숨김 상태에서 통화 종료 후 재 통화 시 학생쪽은 숨김상태로 통화가 시작되는 현상
 + 화면공유 음소거 시 상대방에게 아이콘 출력 안되는 현상
 + 학생 이름이 3자 이상인 경우 통화 종료버튼이 밀려 나오지 않던 현상

# v0.9.0 (20/10/08)
> initialized version.
- 기능 개발 1차 완료 ( 상담 생성 및 입장, 채팅, 1:1 통화, 화면 공유, 화면 숨김, 디바이스 설정, 마이크/카메라 On/Off, 통화 종료 )
```

### Remain issues
```
> 1차 테스트 (10/08, 이슈 총 17건 수정 완료)
> 2차 테스트 (~10/22)
 - 디바이스 설정 팝업이 켜졌을 때 켜지는 카메라가 팝업을 닫아도 off되지 않는 현상
```
