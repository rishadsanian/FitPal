import SessionItem from "./SessionItem";

const ProgramDetail = () => {
  return (
    <div>
      <div class="p-3 m-4 text-start bg-dark">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold text-warning">Program name</h1>
          <p class="col-md-8 fs-4 text-white">
            Description: Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Deleniti ab doloremque sint ea, atque velit? Numquam
            sequi minus dolorem iusto nostrum, doloribus quod eligendi
            commodi consequatur suscipit, rem porro? Dolore!
          </p>
        </div>
      </div>

      <div>
        <h1 className="fw-bold">Session List</h1>
        <div className="px-4 row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
          <SessionItem />
          <SessionItem />
          <SessionItem />
          <SessionItem />
          <SessionItem />
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
