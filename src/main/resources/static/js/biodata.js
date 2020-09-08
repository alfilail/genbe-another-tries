var tableBiodata = {
    create: function () {
        // jika table tersebut datatable, maka clear and dostroy
        if ($.fn.DataTable.isDataTable('#tableBiodata')) {
            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
            $('#tableBiodata').DataTable().clear();
            $('#tableBiodata').DataTable().destroy();
        }

        $.ajax({
            url: '/biodata/data',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableBiodata').DataTable({
                        data: res,
                        columns: [
                            {
                                title: "NIK",
                                data: "nik"
                            },
                            {
                                title: "Nama",
                                data: "name"
                            },
                            {
                                title: "Alamat",
                                data: "address"
                            },
                            {
                                title: "No Hp",
                                data: "hp"
                            },
                            {
                                title: "Tanggal Lahir",
                                data: "tgl"
                            },
                            {
                                title: "Tempat Lahir",
                                data: "tempatLahir"
                            },
                            {
                                title: "Action",
                                data: null,
                                render: function (data, type, row) {
                                    return "<button class='btn-primary' onclick=formBiodata.setEditData('" + data.id + "')>Edit</button>"
                                }
                            }
                        ]
                    });

                } else {

                }
            },
            error: function (err) {
                console.log(err);
            }
        });


    }
};

var formBiodata = {
			resetForm : function() {
				$('#form-biodata')[0].reset();
			},
			saveForm : function() {
				//if ($('#form-biodata').parsley().validate()) {
					var dataResult = getJsonForm($("#form-biodata").serializeArray(), true);

					$.ajax({
						url : '/biodata',
						method : 'post',
						contentType : 'application/json',
						dataType : 'json',
						data : JSON.stringify(dataResult),
						success : function(res, status, xhr) {
							if (xhr.status == 200 || xhr.status == 201) {
								tableBiodata.create();
								$('#modal-biodata').modal('hide')

							} else {

							}
						},
						erorrr : function(err) {
							console.log(err);
						}
					});
				//}
			},
			setEditData : function(idCabang) {
				formBiodata.resetForm();

				$.ajax({
					url : '/biodata/' + id,
					method : 'get',
					contentType : 'application/json',
					dataType : 'json',
					success : function(res, status, xhr) {
						if (xhr.status == 200 || xhr.status == 201) {
							$('#form-biodata').fromJSON(JSON.stringify(res));
							$('#modal-biodata').modal('show')

						} else {

						}
					},
					erorrr : function(err) {
						console.log(err);
					}
				});

            },
            getbynik : function(nik) {
                if ($.fn.DataTable.isDataTable('#tableBiodata')) {
                    //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
                    $('#tableBiodata').DataTable().clear();
                    $('#tableBiodata').DataTable().destroy();
                }

                $.ajax({
                    url : '/biodata/bynik/' + nik,
                    method : 'get',
                    contentType : 'application/json',
                    dataType : 'json',

                    success : function(result) {
                        if(result[0].status == 'true') {
                            $('#tableBiodata').DataTable({
                                data : [result[0].data],
                                columns : [
                                    {
                                        title: "NIK",
                                        data: "nik"
                                    },
                                    {
                                        title: "Nama",
                                        data: "name"
                                    },
                                    {
                                        title: "Alamat",
                                        data: "address"
                                    },
                                    {
                                        title: "Nomor Hp",
                                        data: "hp"
                                    },
                                    {
                                        title: "Tanggal Lahir",
                                        data: "tgl"
                                    },
                                    {
                                        title: "Tempat Lahir",
                                        data: "tempatLahir"
                                    },
                                    {
                                        title: "Umur",
                                        data: "umur"
                                    }
                                ]
                            });
                        } else {

                        }
                    },
                    error : function(err) {
                        console.log(err);
                    }
                })
            }

};