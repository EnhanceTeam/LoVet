<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous">
	</script>
	<link rel="stylesheet" href="{{ asset('css/landingPage.css') }}">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<title>LoVet</title>
</head>

<body>
	{{-- Navigation Bar --}}
	<nav class="navbar navbar-expand-sm bg-yellow-custom sticky-top">
		<div class="container-fluid">
			<div class="navbar-brand fw-bold px-3">
				<img class="h-75 w-100  ms-2" src="{{ asset('images/Logo LoVet/Logo LoVet - HBlack.png') }}" alt="">
			</div>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="collapsibleNavbar">
				<div class="d-flex justify-content-end w-100">
					<ul class="navbar-nav">
						<li class="nav-item me-4">
							<a class="nav-link fw-bold text-black-custom" href="#home">Beranda</a>
						</li>
						<li class="nav-item me-4">
							<a class="nav-link fw-bold text-black-custom" href="#features">Fitur</a>
						</li>
						<li class="nav-item me-4">
							<a class="nav-link fw-bold text-black-custom" href="#feedback">Ulasan</a>
						</li>
						<li class="nav-item me-4">
							<a class="nav-link fw-bold text-black-custom" href="#contactus">Hubungi Kami</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>

	{{-- Introduction --}}
	<div id="home" class="row align-items-center ms-5 ps-2" style="height: 100vh">
		<div class="col ms-5">
			<div class="d-flex justify-content-start">
				<h3 class="fw-bold fst-italic">Sekarang, Merawat Hewan Gak Perlu Pakai Ribet</h3>
			</div>
			<div class="d-flex justify-content-start">
				<h6>Dengan aplikasi LoVet, semua kebutuhan perawatan hewan peliharaanmu ada di genggamanmu</h6>
			</div>
			<button class="btn btn-warning mt-2 hover-shadow"
				onclick="window.open('https://wa.me/+6282336717960?text=Hai+admin+LoVet,+Aku+mau+grooming+nih.+Groomer+mana+yang+bagus+ya?', '_blank'); return false;">
				Hubungi Kami!
			</button>
		</div>
		<div class="col">
			<img src="{{ asset('images/Aset/Decor Pic 1.png') }}" width="75%">
		</div>
	</div>

	{{-- What We Offer --}}
	<div id="features" class="row align-items-center mb-5" style="height: 100vh">
		<div class="d-flex justify-content-center">
			<h2 class="fw-bold">Apa yang LoVet Tawarkan?</h2>
		</div>
		<div class="col d-flex justify-content-end">
			<img src="{{ asset('images/Aset/Decor Pic 2.png') }}" width="75%" height="75%">
		</div>
		<div class="col mx-4">
			<div class="pb-5">
				<div class="d-flex flex-column justify-content-start">
					<h3 class="fw-bold">Grooming</h3>
					<h6>Panggil pet groomer untuk datang langsung ke rumahmu</h6>
				</div>
				<button class="btn btn-warning mt-2 hover-shadow"
					onclick="location.href='https://www.youtube.com/watch?v=lpiB2wMc49g'">
					Klik Disini!
				</button>
			</div>

			<div class="pb-5">
				<div class="d-flex flex-column justify-content-start">
					<h3 class="fw-bold">Marketplace</h3>
					<h6>Penuhi kebutuhan hewanmu</h6>
				</div>
				<button class="btn btn-warning mt-2 hover-shadow"
					onclick="location.href='https://www.youtube.com/watch?v=lpiB2wMc49g'">
					Klik Disini!
				</button>
			</div>

			<div class="pb-5">
				<div class="d-flex flex-column justify-content-start">
					<h3 class="fw-bold">Konsultasi</h3>
					<h6>Konsultasikan kondisi kesehatan hewan kepada para ahli</h6>
				</div>
				<button class="btn btn-warning mt-2 hover-shadow"
					onclick="location.href='https://www.youtube.com/watch?v=lpiB2wMc49g'">
					Klik Disini!
				</button>
			</div>
		</div>
	</div>

	<!-- Why Us? -->
    <div id="feedback" class="row align-items-center" style="height: 100vh">
		<div class="d-flex justify-content-center">
			<h2 class="fw-bold">Kenapa Harus LoVet?</h2>
		</div>

        <!-- Judul -->
        <ul class="nav justify-content-center">
            <li class="nav-item">
              <a class="nav-link active fw-bold fst-italic text-black" aria-current="page" data-bs-toggle="tab" href="#PetOwner">Pemilik Hewan</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fst-italic text-black" data-bs-toggle="tab" href="#Groomer">Groomer</a>
            </li>
        </ul>

        <div class="tab-content">
            <div class="tab-pane active" id="PetOwner">
                <!-- Carousel -->
                <div class="d-flex justify-content-center text-black">
                    <div class="row text-center">
                        <!-- Card View -->
                        <div class="item" style="width: 30rem;">
                            <img src="{{ asset('images/Aset/Profile Picture-1.png') }}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="fw-bold">Pelayanannya Bagus</h5>
                                <h6 class="card-text">Groomer nya sangat baik dan hati-hati dalam bekerja, ramah dan tepat waktu.</h6>
                            </div>
                        </div>

                        <!-- Card View -->
                        <div class="item" style="width: 30rem;">
                            <img src="{{ asset('images/Aset/Profile Picture-2.png') }}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="fw-bold">Hasil Memuaskan</h5>
                                <h6 class="card-text">Hasil tidak kalah dengan Grooming Mahal, Kualitas recommended</h6>
                            </div>
                        </div>

                        <!-- Card View -->
                        <div class="item" style="width: 30rem;">
                            <img src="{{ asset('images/Aset/Profile Picture-3.png') }}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="fw-bold">CS Ramah</h5>
                                <h6 class="card-text">Ketika mengalami kesulitan, CS membantu dengan sangat ramah.</h6>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="tab-pane" id="Groomer">
                <!-- Carousel -->
                <div class="d-flex justify-content-center text-black">
                    <div class="row text-center">
                        <!-- Card View -->
                        <div class="item" style="width: 30rem;">
                            <img src="{{ asset('images/Aset/Profile Picture-4.png') }}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="fw-bold">Aplikasi Mudah Diggunakan</h5>
                                <h6 class="card-text">Pendaftarannya cepat, aplikasi bagus dan mudah diggunakan.</h6>
                            </div>
                        </div>

                        <!-- Card View -->
                        <div class="item" style="width: 30rem;">
                            <img src="{{ asset('images/Aset/Profile Picture-5.png') }}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="fw-bold">Meningkatkan Pembeli</h5>
                                <h6 class="card-text">Semenjak menjadi Mitra LoVet penghasilan perbulan kami terus meningkat.</h6>
                            </div>
                        </div>

                        <!-- Card View -->
                        <div class="item" style="width: 30rem;">
                            <img src="{{ asset('images/Aset/Profile Picture-6.png') }}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="fw-bold">Membantu Promosi</h5>
                                <h6 class="card-text">Bersama LoVet promosi berbagai produk dan jasa menjadi lebih mudah.</h6>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

	{{-- Join Us --}}
	<div class="row align-items-center" style="height: 100vh">
		<div class="d-flex justify-content-center">
			<h2 class="fw-bold">Yuk Ikuti LoVet</h2>
		</div>
		<div class="d-flex flex-column">
			<div class="d-flex justify-content-center">
				<h5 class="fw-bold">Dapatkan informasi terbaru dari kami!</h5>
			</div>
			<div class="d-flex justify-content-center">
				<div class="row align-items-center m-2">
					<div class="col-auto">
						<input type="text" class="form-control" placeholder="Email">
					</div>
					<div class="col-auto">
						<button class="btn btn-warning hover-shadow">
							Ikuti
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

    {{-- Contact Us --}}
    <div id="contactus" class="row align-items-center" style="height: 100vh">
        <div class="d-flex justify-content-center">
			<h2 class="fw-bold">Hubungi LoVet</h2>
		</div>
        <div class="row ms-5 mt-3 mr-3">
            <div class="col d-flex mx-5 align-items-center justify-content-center">
                <ul class="list-group">
                    <li class="d-flex justify-content-start align-items-center list-group-item border-0 ps-4">
                        <img src="{{asset('images/Aset/logo-gmail.png')}}" width="40px" class="ms-1 mr-2">
                        <a href="mailto:enhancecorporation@gmail.com" target="_blank" class="ms-4 link-text-custom">enhancecorporation@gmail.com</a>
                    </li>
                    <li class="d-flex justify-content-start align-items-center list-group-item border-0 ps-3">
                        <img src="{{asset('images/Aset/logo-wa.png')}}" width="50px" class="ms-1">
                        <a href="https://wa.me/+6282336717960?text=Hai+admin+LoVet,+Aku+mau+grooming+nih.+Groomer+mana+yang+bagus+ya?" target="_blank"  class="ms-3 link-text-custom">082336717960</a>
                    </li>
                    <li class="d-flex justify-content-start align-items-center list-group-item border-0 ps-4">
                        <img src="{{asset('images/Aset/logo-ig.png')}}" width="30px" class="ms-3 mr-3">
                        <a href="#" target="_blank" class="ms-4 link-text-custom">{{"@lovet-care"}}</a>
                    </li>
                </ul>
            </div>

            <div class="col">
                <img src="{{ asset('images/Aset/Decor Pic 3.png') }}" width="75%">
            </div>


        </div>



    </div>
</body>

</html>
