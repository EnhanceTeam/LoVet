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
				<img class="h-75 w-75" src="{{ asset('images/Logo LoVet/Logo LoVet - HBlack.png') }}" alt="">
			</div>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="collapsibleNavbar">
				<div class="d-flex justify-content-end w-100">
					<ul class="navbar-nav">
						<li class="nav-item me-4">
							<a class="nav-link fw-bold text-black-custom" href="#home">Home</a>
						</li>
						<li class="nav-item me-4">
							<a class="nav-link fw-bold text-black-custom" href="#features">Features</a>
						</li>
						<li class="nav-item me-4">
							<a class="nav-link fw-bold text-black-custom" href="#feedback">Feedback</a>
						</li>
						<li class="nav-item me-4">
							<a class="nav-link fw-bold text-black-custom" href="#contactus">Contact Us</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>

	{{-- Introduction --}}
	<div id="home" class="row align-items-center m-3 ms-5 ps-2" style="height: 80vh">
		<div class="col mx-4">
			<div class="d-flex justify-content-start">
				<h3 class="fw-bold fst-italic">Sekarang, Merawat Hewan Gak Perlu Pakai Ribet</h3>
			</div>
			<div class="d-flex justify-content-start">
				<h6>Dengan aplikasi LoVet, semua kebutuhan perawatan hewan peliharaanmu ada di genggamanmu</h6>
			</div>
			<button class="btn btn-warning mt-2 hover-shadow"
				onclick="location.href='https://www.youtube.com/watch?v=lpiB2wMc49g'">
				Download Here
			</button>
		</div>
		<div class="col">
			<img src="{{ asset('images/Aset/Decor Pic 1.png') }}" width="80%" height="80%">
		</div>
	</div>

	{{-- What We Offer --}}
	<div id="features" class="row align-items-center mb-5" style="height: 80vh">
		<div class="d-flex justify-content-center">
			<h2 class="fw-bold">What We Offer</h2>
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
					Click Here
				</button>
			</div>

			<div class="pb-5">
				<div class="d-flex flex-column justify-content-start">
					<h3 class="fw-bold">Marketplace</h3>
					<h6>Penuhi kebutuhan hewanmu</h6>
				</div>
				<button class="btn btn-warning mt-2 hover-shadow"
					onclick="location.href='https://www.youtube.com/watch?v=lpiB2wMc49g'">
					Click Here
				</button>
			</div>

			<div class="pb-5">
				<div class="d-flex flex-column justify-content-start">
					<h3 class="fw-bold">Consultation</h3>
					<h6>Konsultasikan kondisi kesehatan hewan kepada para ahli</h6>
				</div>
				<button class="btn btn-warning mt-2 hover-shadow"
					onclick="location.href='https://www.youtube.com/watch?v=lpiB2wMc49g'">
					Click Here
				</button>
			</div>
		</div>
	</div>

	<!-- Why Us? -->
    <div class="row align-items-center" style="height: 80vh">
		<div class="d-flex justify-content-center">
			<h2 class="fw-bold">Why Us?</h2>
		</div>

        <!-- Judul -->
        <ul class="nav justify-content-center">
            <li class="nav-item">
              <a class="nav-link active fw-bold fst-italic text-black" aria-current="page" data-bs-toggle="tab" href="#PetOwner">Pet Owner</a>
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
	<div id="feedback" class="row align-items-center" style="height: 80vh">
		<div class="d-flex justify-content-center">
			<h2 class="fw-bold">Join Us</h2>
		</div>
		<div class="d-flex flex-column">
			<div class="d-flex justify-content-center">
				<h5 class="fw-bold">Keep up with our latest update</h5>
			</div>
			<div class="d-flex justify-content-center">
				<div class="row align-items-center m-2">
					<div class="col-auto">
						<input type="text" class="form-control" placeholder="Email">
					</div>
					<div class="col-auto">
						<button class="btn btn-warning hover-shadow">
							Join Now
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

    {{-- Contact Us --}}
    <div id="contactus" class="row align-items-center" style="height: 80vh">
        <div class="d-flex justify-content-center">
			<h2 class="fw-bold">Contact Us</h2>
		</div>
        <div class="row ms-5 mt-3 mr-3">
            <div class="col d-flex mx-5 align-items-center">
                <ul class="list-group">
                    <li class="d-flex justify-content-start list-group-item border-0 ps-4">
                        <img src="{{asset('images/Aset/logo-gmail.png')}}" width="40px" class="ms-1 mr-2">
                        <a href="#" class="ms-4 link-text-custom">lovet-care@enhance.com</a>
                    </li>
                    <li class="d-flex justify-content-start list-group-item border-0 ps-3">
                        <img src="{{asset('images/Aset/logo-wa.png')}}" width="55px" class="ms-1">
                        <a href="#" class="ms-3 link-text-custom">081XXXXXXXXX</a>
                    </li>
                    <li class="d-flex justify-content-start list-group-item border-0 ps-4">
                        <img src="{{asset('images/Aset/logo-ig.png')}}" width="30px" class="ms-2 mr-3">
                        <a href="#" class="ms-4 link-text-custom">{{"@lovet-care"}}</a>
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
