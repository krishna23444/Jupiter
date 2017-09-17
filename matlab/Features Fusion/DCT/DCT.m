%%%%%%%%%%%%%%%In this program testing is performed on datasets of palmprint
%%%%%%%%%%%%%%%four image is taken for training purpose
%%%%%feature extraction is taken by storing the standard deviation of
%%%%%selected block (after calculting DCT of image)as a feature vector
%%%%%%Single image is converted into vector of 1*39 only%%%%%%%
 
function D=DCT(a)
 [m,n,z]=size(a);
bc=imresize(a,[64,64]);%%%%%%%%%%%resizing it to 64*64
b=bc;
d=dct2(b);%%%%%%%%%%calculating DCT
%%%%%%%%%%% Block by block feature extraction%%%%%%%%%%%%%%%%%%%%
M1=d(1:4,1:4);
M2=d(1:8,1:8);
M3=d(17:32,17:32);
M4=d(17:20,17:20);
M5=d(17:32,1:16);
M6=d(1:4,9:12);
M7=d(9:12,9:12);
M8=d(17:20,9:12);
M9=d(9:12,17:20);
M10=d(25:28,9:12);
M11=d(17:20,17:20);
M12=d(25:28,17:20);
M13=d(1:4,25:28);
M14=d(17:20,25:28);
M15=d(9:12,25:28);
M16=d(25:28,25:28);
M17=d(1:4,33:36);
M18=d(1:4,41:44);
M19=d(9:12,33:36);
M20=d(9:12,40:44);
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5555555555
M21=d(21:24,53:56);
M22=d(13:16,45:48);
M23=d(53:56,21:24);
M24=d(45:48,13:16);
M25=d(1:8,61:64);% taking lower freq coefficient
M26=d(61:64,1:8);
M27=d(57:64,25:32);
M28=d(25:32,57:64);
M29=d(49:52,53:56);
M30=d(45:48,53:56);
M31=d(33:48,49:64);
M32=d(49:64,33:48);
M33=d(49:52,49:52);
M34=d(25:32,25:32);
M35=d(45:48,45:48);
M36=d(37:40,37:40);
M37=d(33:40,33:40);
M38=d(52:56,52:56);
M39=d(57:64,57:64);
%%%%%%%%%%%%%%%%calculating standard deviation of blocks%%%%%%%%%%%%%%%
s1=std(M1);Fea(1)=mean(s1);
s2=std(M2);Fea(2)=mean(s2);
s3=std(M3);Fea(3)=mean(s3);
s4=std(M4);Fea(4)=mean(s4);
s5=std(M5);Fea(5)=mean(s5);
s6=std(M6);Fea(6)=mean(s6);
s7=std(M7);Fea(7)=mean(s7);
s8=std(M8);Fea(8)=mean(s8);
s9=std(M9);Fea(9)=mean(s9);
s10=std(M10);Fea(10)=mean(s10);
s11=std(M11);Fea(11)=mean(s11);
s12=std(M12);Fea(12)=mean(s12);
s13=std(M13);Fea(13)=mean(s13);
s14=std(M14);Fea(14)=mean(s14);
s15=std(M15);Fea(15)=mean(s15);
s16=std(M16);Fea(16)=mean(s16);
% s24=std(M24);Fea(17)=mean(s24);%changed to 17 keep in mind
s17=std(M17);Fea(17)=mean(s17);
s18=std(M18);Fea(18)=mean(s18);
s19=std(M19);Fea(19)=mean(s19);
s20=std(M20);Fea(20)=mean(s20);
s21=std(M21);Fea(21)=mean(s21);
s22=std(M22);Fea(22)=mean(s22);
s23=std(M23);Fea(23)=mean(s23);
s24=std(M24);Fea(24)=mean(s24);
s25=std(M25);Fea(25)=mean(s25);%changed to 1 from 25
s26=std(M26);Fea(26)=mean(s26);% taken other than lower freq coefficient............................
s27=std(M27);Fea(27)=mean(s27);
s28=std(M28);Fea(28)=mean(s28);
s29=std(M29);Fea(29)=mean(s29);
s30=std(M30);Fea(30)=mean(s30);
s31=std(M31);Fea(31)=mean(s31);
s32=std(M32);Fea(32)=mean(s32);
s33=std(M33);Fea(33)=mean(s33);
s34=std(M34);Fea(34)=mean(s34);
s35=std(M35);Fea(35)=mean(s35);
s36=std(M35);Fea(36)=mean(s36);
s37=std(M37);Fea(37)=mean(s37);
s38=std(M38);Fea(38)=mean(s38);
s39=std(M39);Fea(39)=mean(s39);

D = Fea;

end
 
 

