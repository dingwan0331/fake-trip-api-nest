# fake-trip-api

# 프로젝트 ERD

<img width="1063" alt="image" src="https://user-images.githubusercontent.com/100751719/196689640-ef68d4a4-3a81-4915-bb3e-f89dc45bf1d3.png">

# 프로젝트 End-Point

<table style="border-collapse: collapse; width: 100%; height: 210px;" border="1" data-ke-align="alignLeft" data-ke-style="style12">
<tbody>
<tr style="height: 19px;">
<td style="width: 25%; text-align: center; height: 19px;">기능</td>
<td style="width: 25%; text-align: center; height: 19px;">Method</td>
<td style="width: 25%; height: 19px; text-align: center;">URL</td>
</tr>
<tr style="height: 17px;">
<td style="width: 25%; height: 17px;"><b>회원가입 &amp; 로그인</b></td>
<td style="width: 25%; height: 17px;">POST</td>
<td style="width: 25%; height: 17px;">/auth/users/signup</td>
</tr>
<tr style="height: 19px;">
<td style="width: 25%; height: 19px;">회원정보 수정 API</td>
<td style="width: 25%; height: 19px;">PATCH</td>
<td style="width: 25%; height: 19px;">/auth/users</td>
</tr>
<tr style="height: 17px;">
<td style="width: 25%; height: 17px;">호텔 리스트 API</td>
<td style="width: 25%; height: 17px;">GET</td>
<td style="width: 25%; height: 17px;">/product/accommodations</td>
</tr>
<tr style="height: 17px;">
<td style="width: 25%; height: 17px;">상세정보 호텔 API</td>
<td style="width: 25%; height: 17px;">GET</td>
<td style="width: 25%; height: 17px;">/product/accommodations/:id</td>
</tr>
<tr style="height: 17px;">
<td style="width: 25%; height: 17px;">상세정보 룸 API</td>
<td style="width: 25%; height: 17px;">GET</td>
<td style="width: 25%; height: 17px;">/product/rooms/:id</td>
</tr>
<tr style="height: 17px;">
<td style="width: 25%; height: 17px;"><b>상세정보 리뷰 API</b></td>
<td style="width: 25%; height: 17px;">GET</td>
<td style="width: 25%; height: 17px;">/product/reviews?accommodation-id</td>
</tr>
<tr style="height: 17px;">
<td style="width: 25%; height: 17px;">리뷰 작성 API</td>
<td style="width: 25%; height: 17px;">POST</td>
<td style="width: 25%; height: 17px;">/review/reviews</td>
</tr>
<tr style="height: 17px;">
<td style="width: 25%; height: 17px;"><b>리뷰 수정 API</b></td>
<td style="width: 25%; height: 17px;">PUT</td>
<td style="width: 25%; height: 17px;">/review/reviews/:id</td>
</tr>
<tr style="height: 17px;">
<td style="width: 25%; height: 17px;"><b>리뷰 삭제 API</b></td>
<td style="width: 25%; height: 17px;">POST</td>
<td style="width: 25%; height: 17px;">/review/reviews/delete</td>
</tr>
<tr style="height: 17px;">
<td style="width: 25%; height: 17px;">예약 화면 API</td>
<td style="width: 25%; height: 17px;">GET</td>
<td style="width: 25%; height: 17px;">/booking/rooms/:id</td>
</tr>
<tr style="height: 19px;">
<td style="width: 25%; height: 19px;">예약 기능 API (예약하기)</td>
<td style="width: 25%; height: 19px;">POST</td>
<td style="width: 25%; height: 19px;">/booking/bookings</td>
</tr>
</tbody>
</table>
