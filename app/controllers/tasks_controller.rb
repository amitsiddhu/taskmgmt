class TasksController < ApplicationController

  before_action :set_user, only: %i[ index create ]
  before_action :set_task, only: %i[ show update destroy ]

  # GET /tasks
  def index
    @tasks = @user.tasks.all
    @tasks = @tasks.search_by_status(params[:search]) if params[:search].present?
    @tasks = @tasks.sorted_by_due_date(params[:sort_direction]) if params[:sort_direction].present?

    render json: @tasks
  end

  # GET /tasks/1
  def show
    authorize @task
    render json: @task
  end

  # POST /tasks
  def create
    @task = @user.tasks.new(task_params)
    authorize @task
    if @task.save
      render json: @task, status: :created, location: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    authorize @task
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    authorize @task
    @task.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Set the current user
    def set_user
      @user = @current_user
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:title, :description, :status, :due_date)
    end
end
