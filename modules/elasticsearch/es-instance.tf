resource "aws_instance" "elasticsearch_instance" {
  ami           = "${var.aws_ami}"
  instance_type = "${var.aws_instance_type}"
  security_groups = ["${aws_security_group.elasticsearch_cluster_sg.name}"]
  iam_instance_profile = "${aws_iam_instance_profile.elasticsearch_profile.name}"
  user_data = "${file("setup.sh")}"
  count = "1"
  key_name = "${var.key_name}"

  tags {
    Name = "elasticsearch_instance_${count.index}"
  }
}
