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
                            <a class="nav-link fw-bold text-black-custom" href="#">Home</a>
                        </li>
                        <li class="nav-item me-4">
                            <a class="nav-link fw-bold text-black-custom" href="#">Features</a>
                        </li>
                        <li class="nav-item me-4">
                            <a class="nav-link fw-bold text-black-custom" href="#">Feedback</a>
                        </li>
                        <li class="nav-item me-4">
                            <a class="nav-link fw-bold text-black-custom" href="#">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>

    {{-- Introduction --}}
    <div class="row align-items-center m-3 ms-5 ps-2" style="height: 80vh">
        <div class="col mx-4">
            <div class="d-flex justify-content-start">
                <h3 class="fw-bold fst-italic">Sekarang, Merawat Hewan Gak Perlu Pakai Ribet</h2>
            </div>
            <div class="d-flex justify-content-start">
                <h6>Dengan aplikasi LoVet, semua kebutuhan perawatan hewan peliharaanmu ada di genggamanmu</h5>
            </div>
            <button class="btn btn-warning mt-2 hover-shadow"
                onclick="location.href='https://www.youtube.com/watch?v=lpiB2wMc49g'">
                Coming Soon
            </button>
        </div>
        <div class="col">
            <img src="{{ asset('images/Aset/Decor Pic 1.png') }}" width="80%" height="80%">
        </div>
    </div>

    {{-- Join Us --}}
    <div class="row align-items-center" style="height: 80vh">
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
</body>

</html>
