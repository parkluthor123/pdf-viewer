<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF Viewer</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/css/bootstrap.min.css" integrity="sha512-Ez0cGzNzHR1tYAv56860NLspgUGuQw16GiOOp/I2LuTmpSK9xDXlgJz3XN4cnpXWDmkNBKXR/VDMTCnAaEooxA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        .image-preview
        {
            max-width: 100%;
            max-height: 764px;
            overflow: auto;
            margin-top: 25px;
            border-radius: 10px;
            margin: 0 auto;
            position: relative;
            margin-top: 15px;
        }
        .image-preview::-webkit-scrollbar
        {
            display: none;
        }

        .pdf-controls{
            width: 100%;
            background-color: rgba(39, 166, 245, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            gap: 15px;
            margin: 20px 0;
            border-radius: 10px;
            padding: 10px;
        }

        canvas{
            width: 100%;
            height: auto;
        }

    </style>
</head>
<body>
    <div class="container pt-5" style="height: 100vh;">
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div class="form-group">
                    <label for="pdf-viewer" class="form-label">Pdf Viewer</label>
                    <input class="form-control" type="file" id="pdf-viewer" multiple>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div class="image-preview" id="image-preview">
                </div>

                <div class="pdf-controls">
                    <button class="btn btn-light" id="prev-page">Prev</button>
                    <div class="controls-labels">
                        <span id="current-page">1</span> / <span id="total-pages">1</span>
                    </div>
                    <button class="btn btn-light" id="next-page">Next</button>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js"></script>
    <script src="./index.js"></script>
</body>
</html>